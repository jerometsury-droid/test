"""Audit OCR and produce review-only AniList candidates. Never modifies playable data.
Usage: python tools/catalog-review.py [--search 'Rebecca Bluega…' --work 'EDENS ZERO']
"""
import argparse, collections, datetime, json, pathlib, re, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--search'); p.add_argument('--work', default=''); p.add_argument('--output', type=pathlib.Path)
a = p.parse_args()
rows = json.loads((ROOT / 'data/ocr-candidates.json').read_text())
counts = collections.Counter(r['rank'] for r in rows if r['rank'] is not None)
report = {'observations': len(rows), 'unranked': sum(r['rank'] is None for r in rows),
          'truncatedNames': sum(bool(re.search(r'…|\.\.\.', r['name'])) for r in rows),
          'truncatedWorks': sum(bool(re.search(r'…|\.\.\.', r['work'])) for r in rows),
          'ranksOutsideCatalogue': sum(r['rank'] is not None and not 1 <= r['rank'] <= 6736 for r in rows),
          'repeatedRanks': sum(n > 1 for n in counts.values())}
if a.search:
    term = re.split(r'…|\.\.\.', a.search)[0].strip()
    query = '''query($term:String!){Page(perPage:10){characters(search:$term){id name{full native alternative} media(perPage:10){nodes{id title{romaji english native}}}}}}'''
    request = urllib.request.Request('https://graphql.anilist.co',
        data=json.dumps({'query': query, 'variables': {'term': term}}).encode(),
        headers={'Content-Type': 'application/json', 'User-Agent': 'KyaraSolo-catalog-review/0.2'})
    try:
        with urllib.request.urlopen(request, timeout=25) as response: data = json.load(response)
        if data.get('errors'): raise ValueError(data['errors'])
        report['review'] = {'status': 'unverified-candidates', 'observedName': a.search,
            'observedWork': a.work, 'source': 'https://graphql.anilist.co',
            'retrievedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'candidates': data['data']['Page']['characters']}
    except Exception as error:
        report['review'] = {'status': 'blocked', 'reason': str(error), 'observedName': a.search, 'observedWork': a.work}
output = json.dumps(report, ensure_ascii=False, indent=2)
if a.output:
    # Exclusive creation preserves earlier evidence files.
    with a.output.open('x', encoding='utf-8') as f: f.write(output + '\n')
print(output)
