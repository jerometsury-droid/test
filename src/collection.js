/* Derived read-only views. No save migration, invented catalogue entries or rewards. */
(function(root){
 const collator=new Intl.Collator('fr',{sensitivity:'base',numeric:true});
 const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function albums(catalog,inventory){
  const groups=new Map();
  for(const c of catalog){if(!c.work)continue;if(!groups.has(c.work))groups.set(c.work,[]);groups.get(c.work).push(c)}
  return [...groups].map(([work,cards])=>{const owned=cards.filter(c=>(inventory[c.id]||0)>0);return {work,cards,owned:owned.length,total:cards.length,complete:owned.length===cards.length}}).sort((a,b)=>collator.compare(a.work,b.work));
 }
 function owned(catalog,inventory,{query='',rarity='Toutes',work='',duplicates=false,sort='rank'}={}){
  const q=normalize(query);const list=catalog.filter(c=>(inventory[c.id]||0)>0&&(!work||c.work===work)&&(!duplicates||inventory[c.id]>1)&&(rarity==='Toutes'||String(c.rarity)===String(rarity))&&normalize(c.name+' '+c.work).includes(q));
  return list.sort((a,b)=>sort==='name'?collator.compare(a.name,b.name):sort==='rarity'?b.rarity-a.rarity||a.rank-b.rank:a.rank-b.rank);
 }
 const api={albums,owned};root.KyaraCollection=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
