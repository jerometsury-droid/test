/* Runs the packaged Windows app, not a mock server. Invoked by GitHub Actions. */
const {_electron}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 if(process.platform!=='win32')throw Error('This check requires Windows');
 const application=await _electron.launch({executablePath:path.resolve(__dirname,'../dist/KyaraSolo-win32-x64/KyaraSolo.exe'),timeout:60000});
 try{
  const page=await application.firstWindow();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.waitForSelector('#to-open');
  await page.waitForFunction(()=>[...document.querySelectorAll('.hero-cards img')].every(i=>i.complete&&i.naturalWidth>0));
  assert.equal(new URL(page.url()).protocol,'kyara:');
  await page.evaluate(()=>{Math.random=()=>.5});
  await page.click('#to-open');await page.click('#open');await page.waitForSelector('#next');await page.click('#all');
  assert.equal(await page.locator('.summary-slot').count(),5);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('kyara-solo-save-v1')));
  assert.equal(saved.charges,14);assert.equal(saved.openings,1);assert.equal(saved.pendingOpening,null);
  await page.click('#collection');await page.locator('[data-card]').first().click();await page.waitForSelector('dialog[open]');
  await page.waitForFunction(()=>document.querySelector('dialog img').complete&&document.querySelector('dialog img').naturalWidth>0);
  await page.keyboard.press('Escape');await page.waitForSelector('dialog',{state:'detached'});
  await page.click('[data-nav="Wiki"]');await page.check('#unlocked-only');
  assert.equal(await page.locator('.wiki-item').count(),Object.keys(saved.inventory).length);
  assert.deepEqual(errors,[]);console.log('Native Windows PASS: offline portraits, booster, persisted collection, card dialog, unlocked Wiki.');
 }finally{await application.close()}
})().catch(e=>{console.error(e);process.exit(1)});
