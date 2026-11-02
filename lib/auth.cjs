'use strict';
// Publishable key only. Password verification and hashing are handled by Supabase Auth.
const URL_BASE='https://ubquaqxhqfssiejhciop.supabase.co/auth/v1';
const KEY='sb_publishable_FxLe46y_hinOPs9ScsT8fg_TTlZgX0N';
const ACCESS='__Host-uc_access', REFRESH='__Host-uc_refresh';
async function authRequest(path,body,token){
 const response=await fetch(URL_BASE+path,{method:body?'POST':'GET',headers:{apikey:KEY,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(10000)});
 const data=await response.json().catch(()=>({}));return {ok:response.ok,status:response.status,data};
}
function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').map(v=>v.trim().split(/=(.*)/s)).filter(v=>v[0]).map(([k,v])=>[k,v||'']))}
function setSession(res,session){res.setHeader('Set-Cookie',[
 `${ACCESS}=${session?.access_token||''}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${session?Math.min(session.expires_in||3600,3600):0}`,
 `${REFRESH}=${session?.refresh_token||''}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${session?2592000:0}`
 ])}
async function userFor(req,res){
 const c=cookies(req);if(c[ACCESS]){const r=await authRequest('/user',null,c[ACCESS]);if(r.ok)return r.data}
 if(c[REFRESH]){const r=await authRequest('/token?grant_type=refresh_token',{refresh_token:c[REFRESH]});if(r.ok&&r.data.access_token){setSession(res,r.data);const u=await authRequest('/user',null,r.data.access_token);if(u.ok)return u.data}}
 return null;
}
// Owner identity selected by the restaurant owner; never read from user-editable metadata.
const isAdmin=user=>Boolean(user?.phone_confirmed_at&&((process.env.OWNER_PHONE&&String(user.phone||'').replace(/^\+/,'')===process.env.OWNER_PHONE)||user?.app_metadata?.role==='admin'));
function safeUser(user){return user?{id:user.id,phone:user.phone,admin:isAdmin(user)}:null}
function json(res,status,data){res.statusCode=status;res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(data))}
function sameOrigin(req){try{return new URL(req.headers.origin).host===req.headers.host}catch{return false}}
function phone(value){const digits=String(value||'').replace(/[\s()+-]/g,'');const n=digits.length===10?'91'+digits:digits;return /^91[6-9][0-9]{9}$/.test(n)?'+'+n:null}
module.exports={authRequest,cookies,setSession,userFor,isAdmin,safeUser,json,sameOrigin,phone,ACCESS};
