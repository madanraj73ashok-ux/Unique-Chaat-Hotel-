const {authRequest,cookies,setSession,userFor,safeUser,json,sameOrigin,phone,ACCESS}=require('../lib/auth.cjs');
module.exports=async(req,res)=>{
 res.setHeader('Vary','Cookie');
 try{
  if(req.method==='GET')return json(res,200,{user:safeUser(await userFor(req,res))});
  if(req.method!=='POST')return json(res,405,{error:'Method not allowed.'});
  if(!sameOrigin(req))return json(res,403,{error:'Please use the login form on this website.'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{error:'Invalid request.'});
  if(Number(req.headers['content-length']||0)>4096)return json(res,413,{error:'Invalid request.'});
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  if(JSON.stringify(b).length>4096)return json(res,413,{error:'Invalid request.'});
  if(b.action==='logout'){const token=cookies(req)[ACCESS];if(token)await authRequest('/logout',{},token);setSession(res,null);return json(res,200,{user:null})}
  const p=phone(b.phone);if(!p)return json(res,400,{error:'Enter a valid 10-digit Indian phone number.'});
  let result;
  if(b.action==='verify'){
   if(!/^\d{6}$/.test(String(b.code||'')))return json(res,400,{error:'Enter the six-digit verification code.'});
   result=await authRequest('/verify',{phone:p,token:b.code,type:'sms'});
  }else if(['login','signup'].includes(b.action)){
   if(typeof b.password!=='string'||b.password.length>128||b.password.length<(b.action==='signup'?12:1))return json(res,400,{error:'Use a password with at least 12 characters.'});
   if(b.action==='signup'&&(!/[a-z]/.test(b.password)||!/[A-Z]/.test(b.password)||!/[0-9]/.test(b.password)))return json(res,400,{error:'Include uppercase and lowercase letters and a number.'});
   result=await authRequest(b.action==='signup'?'/signup':'/token?grant_type=password',{phone:p,password:b.password});
  }else return json(res,400,{error:'Invalid request.'});
  if(!result.ok){
   const code=result.data?.error_code||result.data?.code;
   if(result.status===429)return json(res,429,{error:'Too many attempts. Please wait before trying again.'});
   if(code==='phone_provider_disabled'||/phone.*disabled|sms.*provider/i.test(result.data?.msg||result.data?.message||''))return json(res,503,{error:'Phone login setup is being completed. Please try again later.'});
   return json(res,400,{error:b.action==='verify'?'The code is invalid or expired.':b.action==='login'?'Phone number or password is incorrect, or the phone needs verification.':'Account could not be created. Try logging in if you already have an account.'});
  }
  if(!result.data.access_token)return json(res,200,{verificationRequired:true});
  setSession(res,result.data);
  // Never use client-editable user metadata to authorize administrators.
  const verified=await authRequest('/user',null,result.data.access_token);
  if(!verified.ok){setSession(res,null);return json(res,401,{error:'Please log in again.'})}
  return json(res,200,{user:safeUser(verified.data)});
 }catch{return json(res,503,{error:'Could not connect. Please try again.'})}
};
