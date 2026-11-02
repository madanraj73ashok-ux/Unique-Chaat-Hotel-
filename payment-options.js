(function(root){
 'use strict';
 const normalize=value=>value==='gpay'?'gpay':'cash';
 const label=(method,mode='delivery')=>`${normalize(method)==='gpay'?'GPay':'Cash'} ${mode==='pickup'?'at pickup':'on delivery'}`;
 const instruction=(method,mode='delivery')=>normalize(method)==='gpay'?`Pay with GPay when ${mode==='pickup'?'you collect your order':'your order arrives'}. The staff will provide the payment QR or UPI details at handover.`:`Pay cash when ${mode==='pickup'?'you collect your order':'your order arrives'}.`;
 const api={normalize,label,instruction};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ChaatPayment=api;
})(typeof window!=='undefined'?window:globalThis);
