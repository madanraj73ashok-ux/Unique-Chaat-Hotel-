// Adapted from Watermelon UI Continuous Tabs (MIT).
// Source: https://registry.watermelon.sh/r/continuous-tabs.json
// Changes: brand CSS, controlled initial state, unique layout group, aria-pressed,
// focus styles retained, and reduced-motion preference respected.
import React, {useState, useId} from 'react';
import {motion, LayoutGroup, useReducedMotion} from 'motion/react';
export function ContinuousTabs({tabs,defaultActiveId,onChange,label}){
 const [active,setActive]=useState(defaultActiveId);
 const reduce=useReducedMotion();const id=useId();
 return <LayoutGroup id={id}><div className="continuous-tabs" role="group" aria-label={label}>
 {tabs.map(tab=><button key={tab.id} type="button" aria-pressed={active===tab.id} onClick={()=>{setActive(tab.id);onChange(tab.id)}} className={'continuous-tab '+(active===tab.id?'selected':'')}>
 {active===tab.id&&<motion.span className="active-pill" layoutId="active-pill" transition={reduce?{duration:0}:{type:'spring',stiffness:380,damping:30,mass:.9}} aria-hidden="true"/>}
 <span className="tab-label">{tab.label}</span>
 </button>)}
 </div></LayoutGroup>
}
