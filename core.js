(function (root) {
  'use strict';
  const menu = typeof module!=='undefined' && module.exports ? require('./menu-data.js') : root.ChaatMenu;
  const addons = [{id:'sev',name:'Extra sev',price:15},{id:'dahi',name:'Extra dahi',price:20},{id:'chutney',name:'Extra chutney',price:10}];
  function normalizeCart(raw) {
    if (!Array.isArray(raw)) return [];
    const result=[];
    for (const line of raw.slice(0,100)) {
      const item=menu.find(m=>m.id===line?.id); if(!item) continue;
      const selected=item.spice && Array.isArray(line.addons) ? [...new Set(line.addons.filter(a=>addons.some(x=>x.id===a)))].sort() : [];
      const spice=item.spice && ['Mild','Medium','Fiery'].includes(line.spice)?line.spice:item.spice?'Medium':'Original';
      const qty=Number.isFinite(line.qty)?Math.min(20,Math.max(1,Math.floor(line.qty))):1;
      const key=[item.id,spice,...selected].join('|');
      const existing=result.find(x=>x.key===key);
      if(existing) existing.qty=Math.min(20,existing.qty+qty); else result.push({id:item.id,spice,addons:selected,qty,key});
    }
    return result;
  }
  const unitPrice=line=>menu.find(m=>m.id===line.id).price+line.addons.reduce((sum,id)=>sum+(addons.find(a=>a.id===id)?.price||0),0);
  function totals(cart,mode='delivery',code='') {
    const subtotal=cart.reduce((sum,line)=>sum+unitPrice(line)*line.qty,0);
    const discount=code==='CHAAT15'&&subtotal>=300?Math.min(80,Math.round(subtotal*.15)):0;
    const delivery=subtotal>0&&mode==='delivery'&&subtotal<499?35:0;
    return {subtotal,discount,delivery,total:subtotal-discount+delivery};
  }
  const api={menu,addons,normalizeCart,unitPrice,totals};
  if(typeof module!=='undefined'&&module.exports)module.exports=api; else root.Chaat=api;
})(typeof window!=='undefined'?window:globalThis);
