import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion} from 'motion/react';
import {AnimatedGroup} from './vendor/animated-group';
import {ContinuousTabs} from './vendor/continuous-tabs';

function HeroText(){
 const reduced=useReducedMotion();
 return <AnimatedGroup as="span" asChild="span" className="animated-lines" preset="blur-slide" variants={reduced?{container:{hidden:{opacity:1},visible:{opacity:1}},item:{hidden:{opacity:1,y:0,filter:'blur(0px)'},visible:{opacity:1,y:0,filter:'blur(0px)'}}}:{container:{hidden:{opacity:1},visible:{opacity:1,transition:{staggerChildren:.1}}},item:{hidden:{opacity:0,y:20,filter:'blur(4px)'},visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:.5}}}}}>
 <span>BIG ON</span><span>FLAVOUR.</span><em>UNIQUELY</em><em>YOURS.</em>
 </AnimatedGroup>
}
function OrderProgress({subtotal,mode}){
 const reduce=useReducedMotion();const remaining=Math.max(0,499-subtotal);
 return <div className="order-progress"><p>{mode==='pickup'?'Pickup selected. No delivery fee.':remaining?<>Just <strong>₹{remaining}</strong> away from free delivery.</>:<>A little extra joy: <strong>free delivery unlocked.</strong></>}</p><div className="progress-track" role="progressbar" aria-label="Progress toward free delivery" aria-valuemin={0} aria-valuemax={499} aria-valuenow={Math.min(499,subtotal)}><motion.div className="progress-fill" initial={false} animate={{width:mode==='pickup'?'100%':`${Math.min(100,subtotal/499*100)}%`}} transition={{duration:reduce?0:.45}}/></div></div>
}
const roots=new Map();
function mount(el,component){if(roots.has(el))return;const root=createRoot(el);roots.set(el,root);root.render(component)}
function enhance(){
 for(const [el,root]of roots){if(!el.isConnected){root.unmount();roots.delete(el)}}
 const hero=document.querySelector('.hero h1');if(hero)mount(hero,<HeroText/>);
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
