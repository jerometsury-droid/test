/* Observe the supplied public Wiki as an anonymous visitor. No login, stealth,
   token extraction, CAPTCHA solving or private endpoint discovery. */
const {chromium}=require('playwright'),fs=require('node:fs/promises');
function sanitize(value,depth=0){
 if(depth>15)return null;
 if(Array.isArray(value))return value.slice(0,15000).map(v=>sanitize(v,depth+1));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!/token|secret|password|authorization|cookie|email|session|api.?key/i.test(k)).map(([k,v])=>[k,sanitize(v,depth+1)]));
 return value;
}
function candidateArrays(value,result=[],depth=0){
 if(depth>8||!value||typeof value!=='object')return result;
 if(Array.isArray(value)&&value.length>3&&value[0]&&typeof value[0]==='object'){
  const keys=Object.keys(value[0]).join(' ').toLowerCase();
  if(/name|character|personnage/.test(keys)&&/rarity|anilist|image|portrait/.test(keys))result.push(value);
 }
 for(const v of Object.values(value))if(v&&typeof v==='object')candidateArrays(v,result,depth+1);
 return result;
}
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900},locale:'fr-FR'}),tasks=[],reports=[],catalogues=[],configuration={},boosterResponses=[],viewerEvidence=[];let activePackId=null;
 page.on('response',response=>{
  if(!(response.headers()['content-type']||'').includes('application/json'))return;
  tasks.push((async()=>{try{const value=await response.json(),url=new URL(response.url());
   if(url.pathname==='/api/config')for(const key of ['catalogSize','freePacks','recycle','dropWeights','pity','golden','godPackChance','godPackSlots'])configuration[key]=value[key];if(/\/api\/(packs|rates)$/.test(url.pathname))boosterResponses.push({sourceURL:url.origin+url.pathname,data:sanitize(value)});
   const arrays=/\/api\/(characters|packs)(\/|$)/.test(url.pathname)?candidateArrays(value):[];reports.push({url:url.origin+url.pathname,status:response.status(),rootKeys:Object.keys(value||{}).slice(0,30),candidateCounts:arrays.map(a=>a.length)});
   for(const data of arrays)catalogues.push({sourceURL:url.origin+url.pathname,packId:activePackId,records:sanitize(data)});
  }catch{}})());
 });
 let status,blocked=false,title='';
 try{
  const response=await page.goto('https://kyara.games/wiki',{waitUntil:'domcontentloaded',timeout:45000});status=response?.status();
  await page.waitForTimeout(6000);title=await page.title();
  const text=await page.locator('body').innerText();
  blocked=/just a moment|attention required|verify you are human|vérifiez que vous êtes humain|checking your browser/i.test(title+' '+text)||status===403;
  if(!blocked){
   await page.goto('https://kyara.games/',{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(5000);
   const closeWelcome=page.getByRole('button',{name:'×',exact:true}).last();if(await closeWelcome.count()&&await closeWelcome.isVisible()){try{await closeWelcome.click({timeout:2000})}catch{}}
   const wanted=['all','shonen','isekai','seinen','shojo','sport','mecha','waifu','husbando'];
   const packResponse=boosterResponses.find(b=>b.sourceURL.endsWith('/packs'));
   for(const packId of wanted){
    const pack=packResponse?.data?.find(p=>p.id===packId);if(!pack)continue;activePackId=packId;
    const escaped=pack.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const candidates=page.locator('button').filter({hasText:new RegExp(escaped+(packId==='shonen'?'(?! Mix)':''))});
    if(await candidates.count()){try{await candidates.first().click({timeout:4000});await page.waitForTimeout(800)}catch{}}
    const view=page.locator('button,a').filter({hasText:/Voir.*(persos|personnages)/i}).first();
    const evidence={packId,expected:pack.rates?.poolSize,viewButtons:await view.count(),buttons:(await page.locator('button').allTextContents()).map(t=>t.trim()).filter(Boolean).slice(0,80)};
    if(await view.count()&&await view.isEnabled()){
     try{await view.click({timeout:5000});await page.waitForTimeout(2000);
      const dialog=page.locator('dialog,[role="dialog"]');
      evidence.dialogImages=await dialog.locator('img').evaluateAll(imgs=>imgs.map(i=>i.getAttribute('src')));
      evidence.dialogText=(await dialog.allTextContents()).join(' ').slice(0,5000);
      await page.keyboard.press('Escape');
      const close=page.getByRole('button',{name:/fermer|close/i}).last();if(await close.count()&&await close.isVisible())await close.click({timeout:3000});
     }catch(error){evidence.error=error.message.slice(0,300)}
    }
    viewerEvidence.push(evidence);
   }
  }
 }catch(error){reports.push({navigationError:error.message});blocked=true}
 await Promise.allSettled(tasks);
 await fs.mkdir('data/public-wiki',{recursive:true});
 await fs.writeFile('data/public-wiki/inspection.json',JSON.stringify({source:'https://kyara.games/wiki',title,status,blocked,inspectedAnonymously:true,captchaSolved:false,configuration,boosterResponses,viewerEvidence,responses:reports,catalogues:catalogues.map(c=>({sourceURL:c.sourceURL,count:c.records.length,keys:Object.keys(c.records[0]||{})}))},null,2));
 for(let i=0;i<catalogues.length;i++)await fs.writeFile('data/public-wiki/catalogue-'+i+'.json',JSON.stringify(catalogues[i],null,2));
 await browser.close();console.log(JSON.stringify({status,title,blocked,catalogueCounts:catalogues.map(c=>c.records.length)}));
})().catch(e=>{console.error(e);process.exit(1)});
