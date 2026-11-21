import React from 'react';
import FoodConveyor from './vendor/food-conveyor';
import DoodleFooter from './vendor/doodle-footer';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion} from 'motion/react';
import {ContinuousTabs} from './vendor/continuous-tabs';

function OrderProgress({subtotal,mode}){
 const reduce=useReducedMotion();const remaining=Math.max(0,499-subtotal);
 return <div className="order-progress"><p>{mode==='pickup'?'Pickup selected. No delivery fee.':remaining?<>Just <strong>₹{remaining}</strong> away from free delivery.</>:<>A little extra joy: <strong>free delivery unlocked.</strong></>}</p><div className="progress-track" role="progressbar" aria-label="Progress toward free delivery" aria-valuemin={0} aria-valuemax={499} aria-valuenow={Math.min(499,subtotal)}><motion.div className="progress-fill" initial={false} animate={{width:mode==='pickup'?'100%':`${Math.min(100,subtotal/499*100)}%`}} transition={{duration:reduce?0:.45}}/></div></div>
}
const roots=new Map();
function mount(el,component){if(roots.has(el))return;const root=createRoot(el);roots.set(el,root);root.render(component)}
function enhance(){
 for(const [el,root]of roots){if(!el.isConnected){root.unmount();roots.delete(el)}}
 const conveyor=document.querySelector('[data-home-conveyor]');
 if(conveyor){
  const ids=['pani-poori','dahi-poori','fresh-veg-pizza','chicken-burger','paneer-pizza','french-fries','chocolate-milkshake','virgin-mojito'];
  const dishes=ids.map(id=>window.Chaat.menu.find(item=>item.id===id)).filter(item=>item&&window.ChaatPhotos?.[item.id]).map(item=>({id:item.id,name:item.name,description:item.description,price:'₹'+item.price,image:window.ChaatPhotos[item.id].file,details:[item.category],tier:1}));
  mount(conveyor,<FoodConveyor className="conveyor-home dark" items={dishes} eyebrow="UNIQUE CHAAT · FOLLOW YOUR CRAVING" heading="Your favourites. On a roll." caption="Chaat, pizza, crispy bites and happy sips. Pick a plate to explore." legend={{}} speed={24} autoplay={false} labels={{add:'Add to basket',close:'Close',previous:'Previous dish',next:'Next dish',pause:'Pause conveyor'}} action={<a href="#/menu" className="button">Explore the menu ↗</a>} onAdd={item=>document.dispatchEvent(new CustomEvent('unique:add',{detail:item.id}))}/>);
 }
 const footer=document.querySelector('[data-doodle-footer]');
 if(footer)mount(footer,<DoodleFooter wordmark="UNIQUE CHAAT" brand="UNIQUE CHAAT" blurb="Street-food soul. A little extra chatpata." tagline="Big flavours. Little moments. Uniquely yours." preset="night" palette={{background:'#100d10',ink:'#fff1e4',accent:'#ff8a50'}} fontFamily="Impact, sans-serif" serifFamily="system-ui, sans-serif" columns={[{title:'Explore',links:[{label:'Menu',href:'#/menu'},{label:'Offers',href:'#/offers'}]},{title:'Meet us',links:[{label:'Our story',href:'#/about'},{label:'Get in touch',href:'#/contact'}]}]} actions={[{label:'Explore the menu',href:'#/menu',icon:'sandwich',variant:'solid'},{label:'Get in touch',href:'#/contact',icon:'heart',variant:'outline'},{label:'Privacy',onClick:()=>document.getElementById('privacy-action').click(),variant:'outline'}]} copyright={'© '+new Date().getFullYear()+' UNIQUE CHAAT'} legal={[{label:'Photo credits',href:'photo-credits.html'}]} socials={[]} doodleCount={8}/>);

 const filters=document.querySelector('.diet-filters');
 if(filters&&!roots.has(filters)){const active=filters.querySelector('[aria-pressed=true]')?.dataset.value||'all';mount(filters,<ContinuousTabs defaultActiveId={active} label="Dietary filter" tabs={[{id:'all',label:'All choices'},{id:'veg',label:'Vegetarian'},{id:'nonveg',label:'Non-vegetarian'}]} onChange={value=>document.dispatchEvent(new CustomEvent('unique:diet',{detail:value}))}/>)}
 const progress=document.querySelector('[data-order-progress]');if(progress)mount(progress,<OrderProgress subtotal={Number(progress.dataset.subtotal)} mode={progress.dataset.mode}/>);
 document.querySelectorAll('.hero-copy>.eyebrow,.hero-copy>p,.hero-actions,.section-head,.story-copy,.offer-banner,.product-card,.category-tile,.value-card').forEach((el,i)=>{
  if(el.dataset.reveal)return;el.dataset.reveal='ready';el.style.setProperty('--reveal-delay',`${(i%4)*65}ms`);revealObserver?.observe(el);
 });
}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealObserver=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target)}
}),{threshold:.08});
let scheduled=false;
new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;enhance()})}).observe(document.body,{childList:true,subtree:true});
// 21st.dev spotlight technique: one delegated listener, CSS variables, no React
// state updates per frame. Native implementation of the public design pattern.
document.addEventListener('pointermove',event=>{
 if(reduced.matches||event.pointerType==='touch')return;
 const card=event.target.closest('.product-card,.offer-banner,.offer-card');if(!card)return;
 const rect=card.getBoundingClientRect();card.style.setProperty('--spot-x',`${event.clientX-rect.left}px`);card.style.setProperty('--spot-y',`${event.clientY-rect.top}px`);
},{passive:true});
document.addEventListener('unique:render',enhance);
enhance();
