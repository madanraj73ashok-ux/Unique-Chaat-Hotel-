// Dependency-free local preview. Bound to this computer only.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const publicRoot=path.join(root,'dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/api/auth'){
    let body='';req.on('data',chunk=>{body+=chunk;if(body.length>4096)req.destroy()});
    req.on('end',()=>{req.body=body;require('./api/auth.js')(req,res)});return;
  }
  if(['/admin','/admin/','/admin/index.html','/admin/admin.js'].includes(url.pathname)){
    if(url.pathname.endsWith('admin.js'))req.url='/api/admin?asset=script';
    return require('./api/admin.js')(req,res);
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end('Method not allowed')}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
  const file=path.resolve(publicRoot,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  if(!file.startsWith(publicRoot+path.sep)){res.writeHead(403);return res.end('Forbidden')}
  fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body)});
});
server.listen(process.env.PORT||4173,'127.0.0.1',()=>console.log('UNIQUE CHAAT preview: http://127.0.0.1:'+(process.env.PORT||4173)));
