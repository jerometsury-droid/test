"""Resize/compress downloaded reference images. No generation, replacement or crop.
Manual save.art images and unrelated local files are never touched.
"""
import concurrent.futures,hashlib,json,pathlib
from PIL import Image,ImageOps
ROOT=pathlib.Path(__file__).resolve().parents[1]
FILE=ROOT/'data/artwork-manifest.js'
def run():
 data=json.loads(FILE.read_text().split('globalThis.KyaraArtwork = ',1)[1].strip().removesuffix(';'))
 originals=[];before=0;after=0
 def convert(item):
  id_,record=item;original=ROOT/record['path']
  if original.suffix=='.webp' and record.get('transform'):return id_,record,None,original.stat().st_size,original.stat().st_size
  if hashlib.sha256(original.read_bytes()).hexdigest()!=record['sha256']:raise ValueError('Image checksum mismatch '+id_)
  with Image.open(original) as source:
   image=ImageOps.exif_transpose(source).convert('RGBA' if 'A' in source.getbands() or 'transparency' in source.info else 'RGB')
   image.thumbnail((320,480),Image.Resampling.LANCZOS)
   destination=original.with_suffix('.webp');image.save(destination,'WEBP',quality=85,method=4)
  updated={**record,'path':destination.relative_to(ROOT).as_posix(),'sourceSHA256':record.get('sourceSHA256',record['sha256']),'sha256':hashlib.sha256(destination.read_bytes()).hexdigest(),'transform':'WebP quality 85, maximum 320x480, no upscaling or cropping; no image generation.'}
  return id_,updated,original if original!=destination else None,original.stat().st_size,destination.stat().st_size
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  for id_,record,original,old_size,new_size in pool.map(convert,list(data['portraits'].items())):
   data['portraits'][id_]=record;before+=old_size;after+=new_size
   if original:originals.append(original)
 temp=FILE.with_suffix('.tmp');temp.write_text('globalThis.KyaraArtwork = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n');temp.replace(FILE)
 for p in originals:
  if p.parent==ROOT/'assets/portraits' and p.name.startswith('kyara-'):p.unlink()
 print('Reference portraits optimized:',len(data['portraits']),'bytes:',before,'->',after,'saved:',round((1-after/before)*100,1),'%')
if __name__=='__main__':run()
