"""Fetch identified anime casts and their reference portraits. Never generates artwork.
Run in GitHub Actions (API access is blocked in the onboarding cloud runtime).
Existing save IDs and observed rarities/stats are preserved. New cards use AniList
IDs and a clearly documented local rarity classification, not invented Kyara ranks.
"""
import concurrent.futures, datetime, hashlib, json, pathlib, re, time, unicodedata, urllib.error, urllib.parse, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1]
API = 'https://graphql.anilist.co'
BASE = json.loads((ROOT / 'data/source-characters.json').read_text())
SEEDS = list(dict.fromkeys([r['work'] for r in BASE if r['work']] + [
 'Eromanga Sensei','D.Gray-man','Infinite Stratos','Date A Live','Penguindrum','Romantic Killer',
 'We Never Learn','Scissor Seven','BAKI','EDENS ZERO','Yona of the Dawn','Charlotte','Aoashi',
 'The Apothecary Diaries',"Frieren: Beyond Journey’s End",'Demon Slayer: Kimetsu no Yaiba',
 'My Hero Academia','Haikyu!!',"Kuroko's Basketball",'Mobile Suit Gundam',
 'Code Geass: Lelouch of the Rebellion','Re:ZERO -Starting Life in Another World-',
 'Fullmetal Alchemist: Brotherhood','Sword Art Online','Naruto: Shippuden','Fate/Zero']))
ALIASES = {'Luffy Monkey':['Monkey D. Luffy'], 'Zoro Roronoa':['Roronoa Zoro'],
 'ACDC':['Esidisi'], 'Levi':['Levi Ackerman'], 'Raine':['Rain'], 'Yuika Suse':['Yuika Suze']}
# Franchise variants are allowed only for the same named anime, never prefix matching.
MEDIA_ALIASES = {'Hunter x Hunter':['Hunter x Hunter (2011)','HUNTER×HUNTER (2011)'],
 'Naruto: Shippuden':['NARUTO: Shippuuden'], 'We Never Learn':['We Never Learn: BOKUBEN'],
 'Scissor Seven':['Cike Wu Liuqi'], 'Witch on the Holy Night':['Mahoutsukai no Yoru'],
 'Haikyu!!':['Haikyuu!!'], 'holo no graffiti':['Holo no Graffiti'],
 'DAN DA DAN':['Dandadan'], 'Blue Archive The Animation':['Blue Archive the Animation']}
last_request = 0

def norm(s):
 s=unicodedata.normalize('NFKD',s).replace('×','x').replace('’',"'")
 return ''.join(c.lower() for c in s if c.isalnum() and not unicodedata.combining(c))
def gql(query, variables):
 global last_request
 for attempt in range(4):
  time.sleep(max(0, 2.1-(time.monotonic()-last_request)))
  last_request=time.monotonic()
  request=urllib.request.Request(API,data=json.dumps({'query':query,'variables':variables}).encode(),headers={'Content-Type':'application/json','User-Agent':'KyaraSolo-reference-catalog/0.4'})
  try:
   with urllib.request.urlopen(request,timeout=35) as response:data=json.load(response)
   if data.get('errors'):raise RuntimeError('AniList GraphQL error: '+str(data['errors']))
   return data['data']
  except urllib.error.HTTPError as error:
   if error.code!=429 or attempt==3:raise
   time.sleep(min(45,int(error.headers.get('Retry-After','30'))))
 raise RuntimeError('API rate limit exhausted')
SEARCH='''query($name:String!){Page(perPage:8){media(search:$name,type:ANIME){id title{english romaji native} synonyms genres tags{name}}}}'''
CAST='''query($id:Int!,$page:Int!){Media(id:$id,type:ANIME){characters(page:$page,perPage:50,sort:FAVOURITES_DESC){pageInfo{hasNextPage} nodes{id name{full native alternative} gender favourites image{large}}}}}'''

def download(item):
 id_,node=item;url=node['image'].get('large')
 if not url:return None
 parsed=urllib.parse.urlsplit(url)
 if parsed.scheme!='https' or parsed.username or parsed.password or parsed.port not in (None,443) or not (parsed.hostname or '').endswith('.anilist.co'):return None
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'KyaraSolo-reference-catalog/0.4'}),timeout=25) as r:body=r.read(1024*1024+1)
  if len(body)>1024*1024:return None
  ext='jpg' if body.startswith(b'\xff\xd8\xff') else 'png' if body.startswith(b'\x89PNG\r\n\x1a\n') else 'webp' if body[:4]==b'RIFF' and body[8:12]==b'WEBP' else None
  if not ext:return None
  file=ROOT/'assets/portraits'/f'anilist-{id_}.{ext}';file.write_bytes(body)
  return id_,{'path':file.relative_to(ROOT).as_posix(),'source':'anilist-reference','anilistCharacterId':id_, 'sourceURL':url,'sha256':hashlib.sha256(body).hexdigest(),'sourceNote':'Portrait de référence AniList. Illustration non générée ; droits des auteurs d’origine.'}
 except (urllib.error.URLError,TimeoutError):return None

def run():
 nodes={};media_by_work={};unresolved=[]
 for work in SEEDS:
  allowed={norm(s) for s in [work,*MEDIA_ALIASES.get(work,[])]}
  candidates=gql(SEARCH,{'name':work})['Page']['media']
  matches=[m for m in candidates if allowed & {norm(s) for s in [*m['title'].values(),*m.get('synonyms',[])] if s}]
  if not matches:unresolved.append({'work':work,'reason':'No exact anime title match'});print('UNRESOLVED anime:',work,flush=True);continue
  # Exact franchise matches are equivalent for character identity; choose the first API result.
  media=matches[0];media_by_work[work]=media;page=1
  while True:
   data=gql(CAST,{'id':media['id'],'page':page})['Media']['characters']
   for node in data['nodes']:
    item=nodes.setdefault(node['id'],{**node,'appearances':[]})
    item['appearances'].append({'work':work,'mediaId':media['id'],'titles':media['title'],'genres':media['genres'],'tags':[t['name'] for t in media['tags']]})
   if not data['pageInfo']['hasNextPage'] or page>=4:break
   page+=1
  print('CAST',work,'pages',page,'unique total',len(nodes),flush=True)
 if len(nodes)<100:raise RuntimeError('Insufficient verified source coverage; refusing an incomplete catalog replacement')
 sources={};claimed=set()
 for row in BASE:
  names={norm(x) for x in [row['name'],*ALIASES.get(row['name'],[])]}
  matches=[n for n in nodes.values() if any(a['work']==row['work'] for a in n['appearances']) and names & {norm(x) for x in [n['name']['full'],*n['name'].get('alternative',[])]}]
  if len(matches)!=1:unresolved.append({'id':row['id'],'name':row['name'],'work':row['work'],'reason':'Missing or ambiguous character match'});continue
  n=matches[0];claimed.add(n['id']);appearance=next(a for a in n['appearances'] if a['work']==row['work'])
  sources[row['id']]={'name':n['name']['full'],'work':row['work'],'anilistId':n['id'],'gender':n['gender'],'favourites':n['favourites'],'nativeName':n['name']['native'],'genres':appearance['genres'],'tags':appearance['tags'],'mediaId':appearance['mediaId'],'identityStatus':'exact-source-match'}
 ordered=sorted(nodes.values(),key=lambda n:(-n['favourites'],n['id']))
 extra=[]
 for i,n in enumerate(ordered):
  if n['id'] in claimed:continue
  p=(i+1)/len(ordered);rarity=5 if p<=.03 else 4 if p<=.1 else 3 if p<=.25 else 2 if p<=.5 else 1 if p<=.75 else 0
  a=n['appearances'][0];extra.append({'id':f"anilist-{n['id']}",'name':n['name']['full'],'work':a['work'],'rarity':rarity,'rank':None,'localRank':i+1,'pow':[45,65,80,93,97,99][rarity],'aura':[31,46,53,63,72,85][rarity],'anilistId':n['id'],'gender':n['gender'],'favourites':n['favourites'],'nativeName':n['name']['native'],'genres':a['genres'],'tags':a['tags'],'mediaId':a['mediaId'],'identityStatus':'exact-source-match','rarityOrigin':'local-popularity-percentile','statsOrigin':'demo'})
 portraits={}
 (ROOT/'assets/portraits').mkdir(parents=True,exist_ok=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
  for result in pool.map(download,[(n['id'],n) for n in ordered]):
   if result:portraits[result[0]]=result[1]
 artwork={}
 for id_,source in sources.items():
  if source['anilistId'] in portraits:artwork[id_]=portraits[source['anilistId']]
 for c in extra:
  if c['anilistId'] in portraits:artwork[c['id']]=portraits[c['anilistId']]
 if len(artwork)<100:raise RuntimeError('Insufficient downloaded reference portraits')
 generated={'version':1,'source':'AniList public API','retrievedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sources':sources,'characters':extra,'unresolved':unresolved,'classification':'Existing observed rarities preserved; new cards use popularity percentiles within this source snapshot, not Kyara official ranks.'}
 (ROOT/'data/catalogue-extra.js').write_text('globalThis.KyaraCatalogueExtra = '+json.dumps(generated,ensure_ascii=False,separators=(',',':'))+';\n')
 (ROOT/'data/artwork-manifest.js').write_text('globalThis.KyaraArtwork = '+json.dumps({'version':2,'fallback':'assets/portraits/unavailable.svg','portraits':artwork},ensure_ascii=False,separators=(',',':'))+';\n')
 (ROOT/'data/catalogue-source-audit.json').write_text(json.dumps({'verifiedSourceCharacters':len(nodes),'extraPlayableCards':len(extra),'existingMatches':len(sources),'downloadedPortraits':len(artwork),'unresolved':unresolved},ensure_ascii=False,indent=2)+'\n')
 (ROOT/'assets/portraits/CREDITS.md').write_text('# Reference character portraits\n\nDownloaded from image URLs returned by the public AniList API for identified character IDs and their exact anime appearance. Original authors and rights holders retain their rights; API availability is not a commercial image licence. No AI-generated illustrations are supplied. Exact source URLs and SHA-256 digests are recorded in data/artwork-manifest.js. Existing personal artwork overrides are preserved.\n')
 # Remove only the four shipped generated assets from the previous release.
 for name in ['makima.png','base-atlas.png','mythic-atlas.png','support-atlas.png']:
  p=ROOT/'assets/portraits'/name
  if p.exists():p.unlink()
 print('DONE',json.dumps({'cards':len(BASE)+len(extra),'portraits':len(artwork),'baseMatches':len(sources)}),flush=True)
if __name__=='__main__':run()
