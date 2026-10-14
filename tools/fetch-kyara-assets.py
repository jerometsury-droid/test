"""Import the observed anonymous public Wiki catalogue and its exact portraits.
No generated illustrations, guessed characters, private endpoints or login.
The old numeric save IDs are catalogue positions and remain unchanged.
"""
import concurrent.futures,datetime,hashlib,json,pathlib,re,time,urllib.error,urllib.parse,urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'data/source-characters.json').read_text())
KEYS={'C':0,'U':1,'R':2,'E':3,'L':4,'M':5}

def fetch_image(row):
 id_=row['id'];url=row['image'];parsed=urllib.parse.urlsplit(url)
 if parsed.scheme!='https' or parsed.hostname!='s4.anilist.co' or parsed.username or parsed.password or parsed.port not in (None,443):return None,'Untrusted source URL'
 for attempt in range(4):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'KyaraSolo-local-reference/0.4'}),timeout=25) as r:body=r.read(2*1024*1024+1)
   if len(body)>2*1024*1024:return None,'Portrait too large'
   ext='jpg' if body.startswith(b'\xff\xd8\xff') else 'png' if body.startswith(b'\x89PNG\r\n\x1a\n') else 'webp' if body[:4]==b'RIFF' and body[8:12]==b'WEBP' else None
   if not ext:return None,'Unsupported image content'
   path=ROOT/'assets/portraits'/f'kyara-{id_}.{ext}';path.write_bytes(body)
   return {'path':path.relative_to(ROOT).as_posix(),'source':'kyara-public-wiki-anilist-reference','anilistCharacterId':id_,'sourceURL':url,'sha256':hashlib.sha256(body).hexdigest(),'sourceNote':'Portrait de référence du Wiki public de Kyara, hébergé par AniList. Illustration non générée.'},None
  except urllib.error.HTTPError as error:
   if error.code not in (429,500,502,503,504):return None,f'HTTP {error.code}'
   time.sleep(min(12,2**(attempt+1)))
  except (urllib.error.URLError,TimeoutError) as error:
   if attempt==3:return None,str(error)
   time.sleep(2**attempt)
 return None,'Transient errors exhausted'

def run():
 snapshot=json.loads((ROOT/'data/public-wiki/catalogue-0.json').read_text());rows=snapshot['records']
 assert snapshot['sourceURL']=='https://kyara.games/api/characters'
 assert len(rows)==6736 and len({r['id'] for r in rows})==6736
 assert sorted(r['rank'] for r in rows)==list(range(6736))
 by_position={str(r['rank']+1):r for r in rows}
 for old in BASE:
  r=by_position[old['id']]
  if r['name']!=old['name']:raise RuntimeError(f"Save identity mismatch at {old['id']}: {old['name']} / {r['name']}")
 print('Verified 6736 catalogue entries and all 33 existing save identities.',flush=True)
 portraits={};missing=[];characters=[]
 (ROOT/'assets/portraits').mkdir(parents=True,exist_ok=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
  results=pool.map(fetch_image,rows)
  for index,(row,(portrait,error)) in enumerate(zip(rows,results),1):
   local_id=str(row['rank']+1)
   if portrait:portraits[local_id]=portrait
   else:missing.append({'id':local_id,'anilistId':row['id'],'name':row['name'],'image':row['image'],'reason':error})
   characters.append({'id':local_id,'name':row['name'],'work':row['series'],'rarity':KEYS[row['rarity']],'rank':row['rank']+1,'pow':row['pow'],'aura':row['aura'],'anilistId':row['id'],'nativeName':row['native'],'favourites':row['favourites'],'identityStatus':'public-kyara-catalogue','rarityOrigin':'public-kyara-catalogue','statsOrigin':'public-kyara-catalogue'})
   if index%250==0:print('Downloaded',index,'/',len(rows),'missing',len(missing),flush=True)
 # A failing source image stays explicit and is never substituted with a random picture.
 audit={'sourceURL':snapshot['sourceURL'],'retrievedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'catalogueCount':len(characters),'portraitCount':len(portraits),'complete':len(portraits)==6736,'preservedSaveIdentities':len(BASE),'missing':missing}
 (ROOT/'data/catalogue-full.js').write_text('globalThis.KyaraFullCatalogue = '+json.dumps({'characters':characters,'sourceURL':snapshot['sourceURL']},ensure_ascii=False,separators=(',',':'))+';\n')
 (ROOT/'data/artwork-manifest.js').write_text('globalThis.KyaraArtwork = '+json.dumps({'version':3,'fallback':'assets/portraits/unavailable.svg','portraits':portraits},ensure_ascii=False,separators=(',',':'))+';\n')
 (ROOT/'data/catalogue-source-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
 (ROOT/'assets/portraits/CREDITS.md').write_text('# Portraits du catalogue public\n\nLes 6 736 identités, noms, séries, raretés et statistiques proviennent du Wiki public de Kyara, observé anonymement à https://kyara.games/wiki. Les portraits sont téléchargés depuis les URLs AniList indiquées par ce catalogue, avec identification stable et contrôle du contenu image. Aucune illustration générée n’est fournie. Les droits restent ceux des auteurs et ayants droit ; la disponibilité dans une API ne constitue pas une licence commerciale. La provenance précise et les empreintes SHA-256 figurent dans data/artwork-manifest.js. Les remplacements personnels restent prioritaires.\n')
 for name in ['makima.png','base-atlas.png','mythic-atlas.png','support-atlas.png']:
  p=ROOT/'assets/portraits'/name
  if p.exists():p.unlink()
 print('RESULT',json.dumps({k:v for k,v in audit.items() if k!='missing'}),flush=True)
if __name__=='__main__':run()
