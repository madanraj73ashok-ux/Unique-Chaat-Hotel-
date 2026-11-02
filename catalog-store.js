(function(root){
 'use strict';
 const KEY='unique-chaat-catalog-v1';
 function normalize(base,raw){
  if(!Array.isArray(raw))return base.map(m=>({...m,available:true,archived:false}));
  const updates=new Map();
  for(const item of raw.slice(0,500)){
   if(!item||typeof item.id!=='string'||!/^[-a-z0-9]{1,100}$/.test(item.id))continue;
   if(typeof item.name!=='string'||item.name.trim().length<2||!Number.isInteger(item.price)||item.price<1||item.price>99999)continue;
   if(typeof item.category!=='string'||!item.category.trim())continue;
   updates.set(item.id,{id:item.id,name:item.name.trim().slice(0,80),price:item.price,category:item.category.trim().slice(0,40),description:typeof item.description==='string'?item.description.trim().slice(0,400):'',veg:item.veg===true?true:item.veg===false?false:null,available:item.available!==false,archived:item.archived===true});
  }
  const seen=new Set();const result=base.map(m=>{seen.add(m.id);return {...m,available:true,archived:false,...updates.get(m.id)}});
  for(const item of updates.values())if(!seen.has(item.id))result.push({...item,tag:item.category.toUpperCase(),image:'',spice:!['Milkshakes','Mojitos','Lassi'].includes(item.category),ingredients:'Ingredients pending restaurant confirmation.',allergens:'Allergen information is unconfirmed.',source:'Added in local admin demo'});
  return result.map(m=>({...m,tag:m.category.toUpperCase()}));
 }
 function read(base){let raw;try{raw=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}return normalize(base,raw)}
 function save(records){try{localStorage.setItem(KEY,JSON.stringify(records));return true}catch{return false}}
 const api={KEY,normalize,read,save};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else{root.ChaatCatalog=api;root.ChaatMenuOriginal=root.ChaatMenu;root.ChaatMenu=read(root.ChaatMenu).filter(m=>!m.archived&&m.available)}
})(typeof window!=='undefined'?window:globalThis);
