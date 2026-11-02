const test=require('node:test');const assert=require('node:assert/strict');
process.env.OWNER_PHONE='919876543210';
const {isAdmin,phone}=require('../lib/auth.cjs');const handler=require('../api/auth.js');const admin=require('../api/admin.js');
function response(){return {headers:{},setHeader(k,v){this.headers[k]=v},end(v){this.body=v},statusCode:200}}
function req(body,headers={}){return {method:'POST',url:'/api/auth',headers:{host:'restaurant.test',origin:'https://restaurant.test','content-type':'application/json',...headers},body}}
test('phone normalization and admin roles reject user-editable privileges',()=>{
 assert.equal(phone('9876543210'),'+919876543210');assert.equal(phone('123'),null);
 assert.equal(isAdmin({phone_confirmed_at:'now',user_metadata:{role:'admin'}}),false);
 assert.equal(isAdmin({app_metadata:{role:'admin'}}),false);
 assert.equal(isAdmin({phone_confirmed_at:'now',app_metadata:{role:'admin'}}),true);
 assert.equal(isAdmin({phone:'919876543210',phone_confirmed_at:'now'}),true);
 assert.equal(isAdmin({phone:'919876543210'}),false);
});
test('auth rejects cross-origin requests before reaching the auth provider',async()=>{
 const r=response();await handler(req({action:'login'}, {origin:'https://evil.test'}),r);assert.equal(r.statusCode,403);
});
test('signup validates passwords before creating an account',async()=>{
 const r=response();await handler(req({action:'signup',phone:'9876543210',password:'short'}),r);assert.equal(r.statusCode,400);
});
test('valid login uses HttpOnly secure cookies and never returns tokens to JavaScript',async()=>{
 const old=global.fetch;let n=0;global.fetch=async()=>({ok:true,status:200,json:async()=>++n===1?{access_token:'access-test',refresh_token:'refresh-test',expires_in:3600}:{id:'u1',phone:'919876543211',phone_confirmed_at:'now',app_metadata:{}}});
 try{const r=response();await handler(req({action:'login',phone:'9876543210',password:'LongPassword123'}),r);assert.equal(r.statusCode,200);assert.equal(JSON.parse(r.body).user.admin,false);assert.ok(!r.body.includes('access-test'));assert.match(r.headers['Set-Cookie'][0],/HttpOnly; Secure; SameSite=Lax/)}finally{global.fetch=old}
});
test('anonymous admin requests show login; admin script is inaccessible',async()=>{
 const r=response();await admin({method:'GET',url:'/admin',headers:{}},r);assert.match(r.body.toString(),/data-admin-login/);assert.ok(!r.body.toString().includes('Recent orders'));
 const s=response();await admin({method:'GET',url:'/api/admin?asset=script',headers:{}},s);assert.equal(s.statusCode,401);
});
test('customer session cannot retrieve the dashboard executable',async()=>{
 const old=global.fetch;global.fetch=async()=>({ok:true,status:200,json:async()=>({id:'customer',phone_confirmed_at:'now',app_metadata:{},user_metadata:{role:'admin'}})});
 try{const r=response();await admin({method:'GET',url:'/api/admin?asset=script',headers:{cookie:'__Host-uc_access=customer-token'}},r);assert.equal(r.statusCode,401)}finally{global.fetch=old}
});
test('verified owner can retrieve the dashboard, without public static copies',async()=>{
 const old=global.fetch;global.fetch=async()=>({ok:true,status:200,json:async()=>({id:'owner',phone:'919876543210',phone_confirmed_at:'now',app_metadata:{}})});
 try{const r=response();await admin({method:'GET',url:'/admin',headers:{cookie:'__Host-uc_access=owner-token'}},r);assert.match(r.body.toString(),/ADMIN WORKSPACE/);assert.equal(r.headers['Cache-Control'],'private, no-store')}finally{global.fetch=old}
 const fs=require('node:fs');assert.equal(fs.existsSync('dist/admin/index.html'),false);assert.equal(fs.existsSync('dist/admin/admin.js'),false);
});
