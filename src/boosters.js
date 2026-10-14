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
