"""Synchronize a local portrait directory with the offline JS manifest.
Copies no artwork and guesses no identity: numeric file stems MUST be existing
stable character IDs. Existing atlas mappings and save.art overrides are kept.
Usage: python tools/artwork-sync.py
"""
import json, pathlib, re
root = pathlib.Path(__file__).resolve().parents[1]
manifest_path = root / 'data/artwork-manifest.js'
text = manifest_path.read_text()
manifest = json.loads(text.split('globalThis.KyaraArtwork = ', 1)[1].rstrip().removesuffix(';'))
# Parse the actual catalogue ID positions (rank is the fourth tuple field).
source = (root / 'src/catalog.js').read_text()
ids = set(re.findall(r"\['[^']*','[^']*',\d+,(\d+),\d+,\d+\]", source))
for path in sorted((root / 'assets/portraits').iterdir()):
    if path.stem in ids and path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp', '.avif'}:
        manifest['portraits'][path.stem] = {
            'path': path.relative_to(root).as_posix(), 'source': 'local-provided',
            'sourceNote': 'Illustration locale fournie ; identité et droits à vérifier par le propriétaire.'}
manifest_path.write_text('/* Local artwork; save.art overrides each portrait. */\nglobalThis.KyaraArtwork = ' + json.dumps(manifest, ensure_ascii=False, indent=2) + ';\n')
print(f"{len(manifest['portraits'])} portraits registered; manual save overrides preserved.")
