const path=require('node:path');
const POLICY="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-src 'none'";
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};
function isGameURL(url){try{const u=new URL(url);return u.protocol==='kyara:'&&u.hostname==='game'&&!u.username&&!u.password&&!u.port}catch{return false}}
async function staticResponse(request,root,readFile){
 if(!isGameURL(request.url)||request.method!=='GET')return new Response('Forbidden',{status:403});
 try{
  const url=new URL(request.url),relative=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';
  if(relative.includes('\\')||relative.includes('\0'))return new Response('Forbidden',{status:403});
  const full=path.resolve(root,relative),outside=path.relative(root,full);
  if(outside.startsWith('..'+path.sep)||outside==='..'||path.isAbsolute(outside))return new Response('Forbidden',{status:403});
  if(!TYPES[path.extname(full)])return new Response('Not found',{status:404});
  const bytes=await readFile(full);
  return new Response(bytes,{status:200,headers:{'Content-Type':TYPES[path.extname(full)],'Content-Security-Policy':POLICY,'X-Content-Type-Options':'nosniff'}});
 }catch{return new Response('Not found',{status:404})}
}
module.exports={staticResponse,isGameURL};
