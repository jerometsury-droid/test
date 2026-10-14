/* Themes read from the supplied video; no generated character illustrations. */
const BOOSTER_THEMES=[
 {id:'mix',subtitle:'Tous les persos',accent:'#f5cd20',foil:'#d9ba58'},
 {id:'shonen',subtitle:'Œuvres shōnen',accent:'#e8953e',foil:'#aa783f'},
 {id:'isekai',subtitle:'Un autre monde',accent:'#65d6ce',foil:'#74aaa4'},
 {id:'seinen',subtitle:'Œuvres seinen',accent:'#c5c6c9',foil:'#aaaeb0'},
 {id:'shojo',subtitle:'Œuvres shōjo',accent:'#f0a3cc',foil:'#d9a4c4'},
 {id:'sport',subtitle:'Terrains et compétitions',accent:'#74c5a0',foil:'#7cac92'},
 {id:'mecha',subtitle:'Robots géants',accent:'#adbacc',foil:'#8b97a4'},
 {id:'waifus',subtitle:'Personnages féminins',accent:'#ff68a8',foil:'#efcedd'},
 {id:'husbandos',subtitle:'Personnages masculins',accent:'#79a8e9',foil:'#394350'}
];

// Exact public source memberships, converted to stable solo save IDs.
const SOURCE_PACK_IDS=['all','shonen','isekai','seinen','shojo','sport','mecha','waifu','husbando'];
BOOSTERS.forEach((booster,index)=>{
 const ids=globalThis.KyaraBoosterPools?.pools[SOURCE_PACK_IDS[index]];
 if(!Array.isArray(ids)||!ids.length)throw Error('Liste de personnages manquante pour '+booster[0]);
 booster.poolIds=ids;booster.poolSource=globalThis.KyaraBoosterPools.sourceURL;
});

BOOSTERS.forEach(b=>{b.category='free';b.slots=[0,0,0,1,2];b.usesFreePacks=true;b.goldenEligible=true});
for(const source of globalThis.KyaraShopPacks||[]){
 const b=[source.name,source.symbol,source.price];Object.assign(b,source,{usesFreePacks:false});if(!b.featuredIds.length)delete b.featuredIds;BOOSTERS.push(b);
 const foil=source.sourceId==='mini'?'#e1d6c1':source.sourceId==='banner-jjk'?'#af93d3':source.sourceId==='top'?'#b77464':source.sourceId==='deep'?'#5a87a9':source.sourceId==='chest'?'#503372':'#252125';
 BOOSTER_THEMES.push({id:source.sourceId,subtitle:source.sourceId==='banner-jjk'?'8 vedettes Mythiques':source.subtitle,accent:source.accent,foil});
}
