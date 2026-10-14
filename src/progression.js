/* Local calendar and reward transactions. No network or storage dependency. */
(function(root){
 const LOGIN=[20,30,40,50,60,80,100];
 const DAILY=[{id:'open',label:'Ouvre 5 boosters',counter:'opened',target:5,reward:20},{id:'recycle',label:'Recycle 10 doublons',counter:'recycled',target:10,reward:20},{id:'view',label:'Consulte 3 fiches différentes',counter:'viewed',target:3,reward:20}];
 const WEEKLY=[{id:'album',label:'Complète une série de 5 personnages ou plus',counter:'albums',target:1,reward:200},{id:'open',label:'Ouvre 150 boosters',counter:'opened',target:150,reward:150},{id:'legend',label:'Obtiens une Légendaire ou une Mythique',counter:'legends',target:1,reward:150}];
 const stamp=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 function keys(now){const d=new Date(now),day=stamp(d);d.setDate(d.getDate()-(d.getDay()+6)%7);return{day,week:stamp(d)}}
 const period=key=>({key,counters:{opened:0,recycled:0,viewed:0,legends:0},viewedIds:[],claimed:[],bonusClaimed:false});
 function state(save,now=Date.now()){
  const k=keys(now),old=save.progression||{};
  return{version:1,day:old.day?.key===k.day?JSON.parse(JSON.stringify(old.day)):period(k.day),week:old.week?.key===k.week?JSON.parse(JSON.stringify(old.week)):period(k.week),login:{lastDay:null,streak:0,missed:false,total:0,...old.login},achievements:[...(old.achievements||[])]};
 }
 function record(save,event,data={},now=Date.now()){
  const p=state(save,now);
  for(const scope of [p.day,p.week]){
   if(event==='open'){scope.counters.opened+=data.count;scope.counters.legends+=data.legends||0}
   if(event==='recycle')scope.counters.recycled++;
   if(event==='view'&&!scope.viewedIds.includes(data.id)){scope.viewedIds.push(data.id);scope.counters.viewed++}
  }
  return{...save,progression:p};
 }
 function list(save,scope,catalog,now=Date.now()){
  const p=state(save,now),current=p[scope];
  const groups=new Map();for(const c of catalog){if(!groups.has(c.work))groups.set(c.work,[]);groups.get(c.work).push(c)}
  const albums=[...groups.values()].filter(cs=>cs.length>=5&&cs.every(c=>save.inventory[c.id]>0)).length;
  return(scope==='day'?DAILY:WEEKLY).map(m=>({...m,value:Math.min(m.target,m.counter==='albums'?albums:current.counters[m.counter]),claimed:current.claimed.includes(m.id)}));
 }
 function reward(save,amount){const chakra=save.chakra+amount;if(!Number.isSafeInteger(chakra))throw Error('Chakra maximum atteint.');return{...save,chakra}}
 function claim(save,scope,id,catalog,now=Date.now()){
  if(!['day','week'].includes(scope))throw Error('Mission inconnue.');
  const mission=list(save,scope,catalog,now).find(m=>m.id===id);
  if(!mission||mission.claimed||mission.value<mission.target)throw Error('Récompense indisponible.');
  const p=state(save,now);p[scope].claimed.push(id);let result=reward(save,mission.reward);
  if(p[scope].claimed.length===3&&!p[scope].bonusClaimed){const bonus=scope==='day'?1:20;const total=(save.bonusPacks||0)+bonus;if(!Number.isSafeInteger(total))throw Error('Trop de boosters bonus.');result.bonusPacks=total;p[scope].bonusClaimed=true}
  return{...result,progression:p};
 }
 function claimLogin(save,now=Date.now()){
  const p=state(save,now),day=keys(now).day,l=p.login;
  if(l.lastDay===day)throw Error('Déjà réclamé aujourd’hui.');
  const gap=l.lastDay?(Date.parse(day)-Date.parse(l.lastDay))/86400000:Infinity;
  if(gap<0)throw Error('Revenez après la dernière date enregistrée.');
  if(l.streak>=7||gap>2||(gap===2&&l.missed)){l.streak=0;l.missed=false}
  if(gap===2&&l.streak>0)l.missed=true;
  l.streak++;l.lastDay=day;l.total++;let result=reward(save,LOGIN[l.streak-1]);
  if(l.streak===7){const n=(save.bonusGolden||0)+1,free=(save.bonusPacks||0)+1;if(!Number.isSafeInteger(n)||!Number.isSafeInteger(free))throw Error('Trop de boosters dorés.');result.bonusGolden=n;result.bonusPacks=free}
  return{...result,progression:p};
 }
 const ACHIEVEMENTS=[{id:'first',label:'Premier booster',target:1,kind:'openings',reward:25},{id:'collector',label:'100 personnages uniques',target:100,kind:'unique',reward:100},{id:'veteran',label:'1 000 boosters ouverts',target:1000,kind:'openings',reward:500}];
 function achievements(save,catalog,now=Date.now()){const p=state(save,now);return ACHIEVEMENTS.map(a=>({...a,value:Math.min(a.target,a.kind==='unique'?catalog.filter(c=>save.inventory[c.id]>0).length:save.openings),claimed:p.achievements.includes(a.id)}))}
 function claimAchievement(save,id,catalog,now=Date.now()){const a=achievements(save,catalog,now).find(a=>a.id===id);if(!a||a.claimed||a.value<a.target)throw Error('Succès indisponible.');const p=state(save,now);p.achievements.push(id);return{...reward(save,a.reward),progression:p}}
 function validate(p){
  const integer=n=>Number.isSafeInteger(n)&&n>=0,date=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s));
  if(!p||p.version!==1)throw Error('Progression invalide');
  for(const scope of ['day','week']){const s=p[scope];if(!s||!date(s.key)||!s.counters||!['opened','recycled','viewed','legends'].every(k=>integer(s.counters[k]))||!Array.isArray(s.viewedIds)||s.viewedIds.length>6736||!s.viewedIds.every(i=>typeof i==='string')||new Set(s.viewedIds).size!==s.viewedIds.length||!Array.isArray(s.claimed)||new Set(s.claimed).size!==s.claimed.length||!s.claimed.every(i=>(scope==='day'?DAILY:WEEKLY).some(m=>m.id===i))||typeof s.bonusClaimed!=='boolean')throw Error('Progression invalide')}
  const l=p.login;if(!l||(l.lastDay!==null&&!date(l.lastDay))||!integer(l.streak)||l.streak>7||!integer(l.total)||typeof l.missed!=='boolean'||!Array.isArray(p.achievements)||new Set(p.achievements).size!==p.achievements.length||!p.achievements.every(i=>ACHIEVEMENTS.some(a=>a.id===i)))throw Error('Progression invalide');
 }
 const api={LOGIN,keys,state,record,list,claim,claimLogin,achievements,claimAchievement,validate};root.KyaraProgression=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
