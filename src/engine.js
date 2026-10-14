/* Pure solo rules. Storage/UI are adapters; a future private server owns this transaction. */
(function(root){
 const RULES=Object.freeze({weights:[62,25,11.4,1.4,.15,.025],minimums:[0,0,0,1,2],pity:250,golden:10,divine:2000,version:1});
 function weighted(min,random){
  const total=RULES.weights.slice(min).reduce((a,b)=>a+b,0);let v=random()*total;
  for(let i=min;i<6;i++){v-=RULES.weights[i];if(v<=0)return i}return 5;
 }
 function validateSave(s){
  const integer=(v)=>Number.isSafeInteger(v)&&v>=0;
  if(!s||typeof s!=='object'||!s.inventory||Array.isArray(s.inventory)||typeof s.inventory!=='object'||!integer(s.chakra))throw Error('Sauvegarde invalide');
  for(const key of ['charges','openings','pity','standard'])if(s[key]!==undefined&&!integer(s[key]))throw Error('Compteur invalide : '+key);
  if(s.charges>15)throw Error('Charges invalides');
  if(!Object.values(s.inventory).every(integer))throw Error('Inventaire invalide');
  if(s.art!==undefined&&(!s.art||Array.isArray(s.art)||typeof s.art!=='object'||!Object.values(s.art).every(v=>typeof v==='string'&&/^data:image\/(png|jpeg|jpg|webp|gif|avif|bmp|svg\+xml|x-icon);base64,[A-Za-z0-9+/=\s]+$/.test(v))))throw Error('Illustration invalide');
  if(s.lastNew!==undefined&&(!Array.isArray(s.lastNew)||s.lastNew.length!==5||!s.lastNew.every(v=>typeof v==='boolean')))throw Error('Résultats invalides');
  if(s.history!==undefined&&!Array.isArray(s.history))throw Error('Historique invalide');
  if(s.pendingOpening&&!s.lastNew)throw Error('Résultats manquants');
  if(s.pendingOpening){const p=s.pendingOpening;if(!Array.isArray(p.ids)||p.ids.length!==5||!p.ids.every(x=>typeof x==='string')||!integer(p.booster)||p.booster>8)throw Error('Ouverture invalide')}
  if(s.freeAt!==undefined&&(!Number.isFinite(s.freeAt)||s.freeAt<0))throw Error('Date invalide');
  return s;
 }
 function open(input,booster,catalog,boosters,random=Math.random,now=Date.now()){
  validateSave(input);
  if(input.pendingOpening)throw Error('Termine le booster déjà ouvert.');
  if(!boosters[booster])throw Error('Booster inconnu');
  const price=boosters[booster][2];
  if(input.charges<=0&&input.chakra<price)throw Error('Chakra insuffisant. Recycle des doublons ou attends une charge gratuite.');
  const divine=random()<1/RULES.divine,golden=(input.standard+1)%RULES.golden===0,pity=input.pity+1>=RULES.pity;
  const rarities=RULES.minimums.map(min=>weighted(divine?3:min,random));
  if(golden&&!rarities.some(r=>r>=3))rarities[4]=3;
  if(divine||pity)rarities[4]=5;
  const cards=rarities.map(r=>{const pool=catalog.filter(c=>c.rarity===r);if(!pool.length)throw Error('Catalogue incomplet pour la rareté '+r);return pool[Math.floor(random()*pool.length)]});
  const save={...input,inventory:{...input.inventory},history:[...(input.history||[])],schemaVersion:2,rulesVersion:RULES.version};
  const seen=new Set(Object.keys(save.inventory).filter(id=>save.inventory[id]>0));
  save.lastNew=cards.map(c=>{const fresh=!seen.has(c.id);seen.add(c.id);return fresh});
  cards.forEach(c=>save.inventory[c.id]=(save.inventory[c.id]||0)+1);
  if(save.charges>0)save.charges--;else save.chakra-=price;
  save.openings++;save.standard++;save.pity=rarities.includes(5)?0:save.pity+1;
  const record={id:'solo-'+now+'-'+save.openings,at:now,booster:boosters[booster][0],boosterIndex:booster,ids:cards.map(c=>c.id),divine,golden};
  save.history.unshift(record);save.history=save.history.slice(0,100);
  save.pendingOpening={...record,booster};
  return {save,cards};
 }
 const api={RULES,open,validateSave};root.KyaraEngine=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
