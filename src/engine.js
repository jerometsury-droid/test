/* Pure solo rules. Storage/UI are adapters; a future private server owns this transaction. */
(function(root){
 const RULES=Object.freeze({weights:[62,25,11.4,1.4,.15,.025],minimums:[0,0,0,1,2],goldenMinimums:[0,0,1,2,3],pity:250,golden:10,divine:2000,version:2});
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
  if(s.pendingOpening?.packs){const packs=s.pendingOpening.packs;if(!Array.isArray(packs)||![1,5,10].includes(packs.length)||packs.some(p=>!Array.isArray(p.ids)||p.ids.length!==5||!p.ids.every(id=>typeof id==='string')||!Array.isArray(p.newFlags)||p.newFlags.length!==5||!p.newFlags.every(v=>typeof v==='boolean')))throw Error('Lot de boosters invalide');}
  if(s.pendingOpening){const p=s.pendingOpening;if(!Array.isArray(p.ids)||p.ids.length!==5||!p.ids.every(x=>typeof x==='string')||!integer(p.booster)||p.booster>8)throw Error('Ouverture invalide')}
  if(s.freeAt!==undefined&&(!Number.isFinite(s.freeAt)||s.freeAt<0))throw Error('Date invalide');
  return s;
 }
 const poolCache=new WeakMap();
 function rarityPools(catalog,definition){
  let cached=poolCache.get(catalog);if(!cached){cached=new WeakMap();poolCache.set(catalog,cached)}
  if(cached.has(definition))return cached.get(definition);
  const eligible=definition.poolIds===undefined?null:new Set(definition.poolIds);
  const buckets=Array.from({length:6},()=>[]);
  for(const card of catalog)if(!eligible||eligible.has(card.id))buckets[card.rarity].push(card);
  if(buckets.some(pool=>!pool.length))throw Error('Pool du booster incomplet. Aucun tirage ni débit effectué.');
  cached.set(definition,buckets);return buckets;
 }
 function open(input,booster,catalog,boosters,random=Math.random,now=Date.now()){
  validateSave(input);
  if(input.pendingOpening)throw Error('Termine le booster déjà ouvert.');
  if(!boosters[booster])throw Error('Booster inconnu');
  const price=boosters[booster][2];
  if(input.charges<=0&&input.chakra<price)throw Error('Chakra insuffisant. Recycle des doublons ou attends une charge gratuite.');
  const pools=rarityPools(catalog,boosters[booster]);
  const divine=random()<1/RULES.divine,golden=(input.standard+1)%RULES.golden===0,pity=input.pity+1>=RULES.pity;
  const minimums=divine?[3,3,3,3,5]:golden?RULES.goldenMinimums:RULES.minimums;
  const rarities=minimums.map(min=>weighted(min,random));
  if(divine||pity)rarities[4]=5;
  const cards=rarities.map(r=>{const pool=pools[r];if(!pool.length)throw Error('Catalogue incomplet pour la rareté '+r);return pool[Math.floor(random()*pool.length)]});
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
 function openMany(input,booster,catalog,boosters,count=1,random=Math.random,now=Date.now()){
  validateSave(input);
  if(![1,5,10].includes(count))throw Error('Quantité invalide');
  if(input.pendingOpening)throw Error('Termine le booster déjà ouvert.');
  if(!boosters[booster])throw Error('Booster inconnu');
  const paid=Math.max(0,count-input.charges),cost=paid*boosters[booster][2];
  if(!Number.isSafeInteger(cost)||input.chakra<cost)throw Error('Chakra insuffisant pour ces '+count+' boosters.');
  let state=input;const packs=[],cards=[],flags=[];
  for(let i=0;i<count;i++){
   const tx=open(state,booster,catalog,boosters,random,now);
   packs.push({...tx.save.history[0],newFlags:tx.save.lastNew});cards.push(...tx.cards);flags.push(...tx.save.lastNew);
   state={...tx.save,pendingOpening:null};
  }
  state={...state,lastNew:packs[0].newFlags,pendingOpening:{...packs[0],booster,packs,quantity:count}};
  return {save:state,cards,flags,packs};
 }
 function addChakra(input,amount){
  const text=String(amount).trim();
  if(!/^\d+$/.test(text))throw Error('Entre un nombre entier positif.');
  const delta=Number(text),chakra=input.chakra+delta;
  if(delta<1||!Number.isSafeInteger(delta)||!Number.isSafeInteger(chakra))throw Error('Montant trop grand ou invalide.');
  return {...input,chakra};
 }
 function dropRates(){
  const total=RULES.weights.reduce((a,b)=>a+b,0);
  return RULES.weights.map((weight,rarity)=>({rarity,weight,perCard:weight/total,
   perBooster:1-RULES.minimums.reduce((none,min)=>none*(1-(rarity<min?0:weight/RULES.weights.slice(min).reduce((a,b)=>a+b,0))),1)}));
 }
 const api={RULES,open,openMany,addChakra,dropRates,validateSave};root.KyaraEngine=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
