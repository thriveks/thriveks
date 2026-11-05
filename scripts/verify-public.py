"""Validate every built document, current internal destination, and footer credit."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote,urljoin
import json,sys
root=Path('dist')
class Doc(HTMLParser):
 def __init__(self,s):
  super().__init__();self.refs=[];self.ids=set();self.images=[];self.credit=False;self.feed(s)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  for key in ['href','src']:
   if key in a:self.refs.append((tag,key,a[key]))
  if tag=='img':self.images.append(a)
docs={p:Doc(p.read_text()) for p in root.rglob('*.html')}
errors=[];links=set();externals=set();redirects={}
for line in (root/'_redirects').read_text().splitlines():
 a=line.split()
 if len(a)==3 and '*' not in a[0]:redirects[a[0]]=a[1]
def resolve(path):
 path=unquote(path)
 f=root/path.lstrip('/')
 for candidate in [f,f.with_suffix('.html') if not f.suffix else f,f/'index.html']:
  if candidate.is_file():return candidate
 return None
for p,d in docs.items():
 s=p.read_text()
 if s.count('Website Designed &amp; Powered by')!=1 or '<a href="/"><strong>ThriveKS</strong></a>' not in s:errors.append([str(p),'credit missing/duplicated/malformed'])
 if p.parent==root and "'/polish.css'" not in s:errors.append([str(p),'shared navigation stylesheet missing'])
 if 'legacy-archive' in p.parts:continue # These entry points redirect to the maintained documents.
 for tag,key,url in d.refs:
  u=urlsplit(url)
  if u.scheme in ['http','https']:
   
   if tag=='a' and key=='href':externals.add(url)
   if key=='href' and ('thriveks.neocities.org' in u.netloc or u.netloc in ['thriveks.com','www.thriveks.com']):errors.append([str(p),'old-site navigation',url])
   continue
  if u.scheme or url.startswith('//'):continue
  base='/'+str(p.relative_to(root));target=urlsplit(urljoin(base,url));path=target.path
  if path in redirects:
   dest=redirects[path]
   if dest.startswith('http'):continue
   target=urlsplit(dest);path=target.path
  f=resolve(path)
  links.add(path)
  if not f:errors.append([str(p),'missing local file',url]);continue
  if target.fragment and f in docs and unquote(target.fragment) not in docs[f].ids:errors.append([str(p),'missing anchor',url])
 for img in d.images:
  if 'alt' not in img:errors.append([str(p),'image missing alternative text',img.get('src')])
report={'documents':len(docs),'maintained_documents':sum('legacy-archive' not in p.parts for p in docs),'internal_targets':len(links),'external_targets':sorted(externals),'errors':errors}
Path('../qa/enterprise/static-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='external_targets'},indent=2))
sys.exit(bool(errors))
