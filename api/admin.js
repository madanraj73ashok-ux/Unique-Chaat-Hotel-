const fs=require('node:fs');const path=require('node:path');
const {userFor,isAdmin}=require('../lib/auth.cjs');
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');res.setHeader('X-Robots-Tag','noindex, nofollow');
 if(!['GET','HEAD'].includes(req.method)){res.statusCode=405;return res.end()}
 try{
  const user=await userFor(req,res);const script=req.query?.asset==='script'||new URL(req.url,'https://localhost').searchParams.get('asset')==='script'||new URL(req.url,'https://localhost').pathname==='/admin/admin.js';
  if(script&&!isAdmin(user)){res.statusCode=401;return res.end('Authentication required')}
  const file=script?'admin/admin.js':isAdmin(user)?'admin/index.html':'auth/admin-login.html';
  res.setHeader('Content-Type',script?'application/javascript; charset=utf-8':'text/html; charset=utf-8');
  const body=fs.readFileSync(path.join(process.cwd(),file));res.statusCode=200;res.end(req.method==='HEAD'?undefined:body);
 }catch{res.statusCode=503;res.end('Please try again.')}
};
