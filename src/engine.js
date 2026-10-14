/* Pure solo rules. Storage/UI are adapters; a future private server owns this transaction. */
(function(root){
 const RULES=Object.freeze({weights:[62,25,11.4,1.4,.15,.025],minimums:[0,0,0,1,2],goldenMinimums:[0,0,1,2,3],pity:250,golden:10,divine:2000,version:2});
 function weighted(min,random,pools,weights=RULES.weights){
  const eligible=weights.map((w,r)=>r>=min&&(!pools||pools[r].length)?w:0),total=eligible.reduce((a,b)=>a+b,0);
  if(!total)throw Error('Aucune carte disponible pour cette garantie.');let v=random()*total,last=min;
  for(let r=min;r<6;r++){if(!eligible[r])continue;last=r;v-=eligible[r];if(v<=0)return r}return last;
 }
 function validateSave(s,definitions){
  const integer=(v)=>Number.isSafeInteger(v)&&v>=0;
  if(!s||typeof s!=='object'||!s.inventory||Array.isArray(s.inventory)||typeof s.inventory!=='object'||!integer(s.chakra))throw Error('Sauvegarde invalide');
  for(const key of ['charges','openings','pity','standard'])if(s[key]!==undefined&&!integer(s[key]))throw Error('Compteur invalide : '+key);
  for(const key of ['bonusPacks','bonusGolden','bannerPity'])if(s[key]!==undefined&&!integer(s[key]))throw Error('Bonus invalide');
  if(s.progression!==undefined){if(!root.KyaraProgression)throw Error('Progression indisponible');root.KyaraProgression.validate(s.progression)}
  if(s.charges>15)throw Error('Charges invalides');
  if(!Object.values(s.inventory).every(integer))throw Error('Inventaire invalide');
  if(s.art!==undefined&&(!s.art||Array.isArray(s.art)||typeof s.art!=='object'||!Object.values(s.art).every(v=>typeof v==='string'&&/^data:image\/(png|jpeg|jpg|webp|gif|avif|bmp|svg\+xml|x-icon);base64,[A-Za-z0-9+/=\s]+$/.test(v))))throw Error('Illustration invalide');
  const validSize=n=>[3,4,5,20].includes(n);
  if(s.lastNew!==undefined&&(!Array.isArray(s.lastNew)||!validSize(s.lastNew.length)||!s.lastNew.every(v=>typeof v==='boolean')))throw Error('Résultats invalides');
  if(s.history!==undefined&&!Array.isArray(s.history))throw Error('Historique invalide');
  if(s.pendingOpening&&!s.lastNew)throw Error('Résultats manquants');
  if(s.pendingOpening){const p=s.pendingOpening,expected=definitions?.[p.booster]?.slots?.length||(!definitions||definitions[p.booster]?null:-1);
   if(!integer(p.booster)||p.booster>15||!Array.isArray(p.ids)||!validSize(p.ids.length)||!p.ids.every(x=>typeof x==='string')||s.lastNew.length!==p.ids.length||(expected&&p.ids.length!==expected)||(p.cardCount!==undefined&&p.cardCount!==p.ids.length))throw Error('Ouverture invalide');
   if(p.packs){if(!Array.isArray(p.packs)||![1,5,10].includes(p.packs.length)||p.packs.some(pack=>!Array.isArray(pack.ids)||pack.ids.length!==p.ids.length||!pack.ids.every(id=>typeof id==='string')||!Array.isArray(pack.newFlags)||pack.newFlags.length!==pack.ids.length||!pack.newFlags.every(v=>typeof v==='boolean')))throw Error('Lot de boosters invalide')}
  }
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
  if(!buckets.some(pool=>pool.length)||(!definition.allowMissingRarities&&buckets.some(pool=>!pool.length)))throw Error('Pool du booster incomplet. Aucun tirage ni débit effectué.');
  cached.set(definition,buckets);return buckets;
 }
 function open(input,booster,catalog,boosters,random=Math.random,now=Date.now()){
  validateSave(input,boosters);
  if(input.pendingOpening)throw Error('Termine le booster déjà ouvert.');
  if(!boosters[booster])throw Error('Booster inconnu');
  const definition=boosters[booster],price=definition[2],paid=definition.usesFreePacks===false;
  if((paid||input.charges+(input.bonusPacks||0)<=0)&&input.chakra<price)throw Error('Chakra insuffisant pour ce booster.');
  const pools=rarityPools(catalog,definition),slots=definition.slots||RULES.minimums,cardCount=slots.length;
  const eligible=definition.goldenEligible!==false,divine=random()<1/RULES.divine&&!!pools[5].length&&cardCount===5,periodicGolden=eligible&&(input.standard+1)%RULES.golden===0,bonusGolden=eligible&&!paid&&!periodicGolden&&(input.bonusGolden||0)>0,golden=periodicGolden||bonusGolden,pity=input.pity+1>=RULES.pity&&!!pools[5].length;
  const minimums=divine?[3,3,3,3,5]:golden?RULES.goldenMinimums:slots;
  const rarities=minimums.map((min,i)=>weighted(min,random,pools,!divine&&!golden&&definition.slotWeights?definition.slotWeights[i]:RULES.weights));
  const featuredDue=definition.featuredIds&&(input.bannerPity||0)+1>=100;
  if(divine||pity||featuredDue)rarities[cardCount-1]=5;
  const featured=definition.featuredIds?new Set(definition.featuredIds):null;
  const cards=rarities.map((r,i)=>{
   let pool=pools[r];
   if(featured&&r===5){const wantsFeatured=featuredDue&&i===cardCount-1||random()<.5;pool=pool.filter(c=>featured.has(c.id)===wantsFeatured)}
   if(!pool.length)throw Error('Catalogue incomplet pour la rareté '+r);return pool[Math.floor(random()*pool.length)];
  });
  const save={...input,inventory:{...input.inventory},history:[...(input.history||[])],schemaVersion:2,rulesVersion:RULES.version};
  const seen=new Set(Object.keys(save.inventory).filter(id=>save.inventory[id]>0));
  save.lastNew=cards.map(c=>{const fresh=!seen.has(c.id);seen.add(c.id);return fresh});
  cards.forEach(c=>save.inventory[c.id]=(save.inventory[c.id]||0)+1);
  if(paid)save.chakra-=price;else if(save.bonusPacks>0)save.bonusPacks--;else if(save.charges>0)save.charges--;else save.chakra-=price;
  if(bonusGolden&&!divine)save.bonusGolden--;
  save.openings++;if(eligible)save.standard++;if(featured)save.bannerPity=cards.some(c=>featured.has(c.id))?0:(input.bannerPity||0)+1;save.pity=rarities.includes(5)?0:save.pity+1;
  const record={id:'solo-'+now+'-'+save.openings,at:now,booster:boosters[booster][0],boosterIndex:booster,ids:cards.map(c=>c.id),cardCount,divine,golden};
  save.history.unshift(record);save.history=save.history.slice(0,100);
  save.pendingOpening={...record,booster};
  return {save,cards};
 }
 function openMany(input,booster,catalog,boosters,count=1,random=Math.random,now=Date.now()){
  validateSave(input,boosters);
  if(![1,5,10].includes(count))throw Error('Quantité invalide');
  if(input.pendingOpening)throw Error('Termine le booster déjà ouvert.');
  if(!boosters[booster])throw Error('Booster inconnu');
  const paid=boosters[booster].usesFreePacks===false?count:Math.max(0,count-input.charges-(input.bonusPacks||0)),cost=paid*boosters[booster][2];
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
 function dropRates(definition){
  const total=RULES.weights.reduce((a,b)=>a+b,0);
  if(definition?.slotWeights)return RULES.weights.map((weight,rarity)=>({rarity,weight,perCard:definition.slotWeights.reduce((sum,w)=>sum+w[rarity]/w.reduce((a,b)=>a+b,0),0)/definition.slotWeights.length,perBooster:1-definition.slotWeights.reduce((none,w)=>none*(1-w[rarity]/w.reduce((a,b)=>a+b,0)),1)}));
  return RULES.weights.map((weight,rarity)=>({rarity,weight,perCard:weight/total,
   perBooster:1-RULES.minimums.reduce((none,min)=>none*(1-(rarity<min?0:weight/RULES.weights.slice(min).reduce((a,b)=>a+b,0))),1)}));
 }
 const api={RULES,open,openMany,addChakra,dropRates,validateSave};root.KyaraEngine=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
