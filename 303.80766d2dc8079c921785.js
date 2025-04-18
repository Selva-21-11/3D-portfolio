"use strict";(self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[]).push([[303],{4303:(e,t,i)=>{i.r(t),i.d(t,{default:()=>b});var n=i(6540),o=i(8874),s=i(4848),a=i(9473),r=i(8601),l=i(6719),c=i(5446);class d extends n.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function p({children:e,isPresent:t}){const i=(0,n.useId)(),o=(0,n.useRef)(null),a=(0,n.useRef)({width:0,height:0,top:0,left:0}),{nonce:r}=(0,n.useContext)(c.Q);return(0,n.useInsertionEffect)((()=>{const{width:e,height:n,top:s,left:l}=a.current;if(t||!o.current||!e||!n)return;o.current.dataset.motionPopId=i;const c=document.createElement("style");return r&&(c.nonce=r),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`\n          [data-motion-pop-id="${i}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${n}px !important;\n            top: ${s}px !important;\n            left: ${l}px !important;\n          }\n        `),()=>{document.head.removeChild(c)}}),[t]),(0,s.jsx)(d,{isPresent:t,childRef:o,sizeRef:a,children:n.cloneElement(e,{ref:o})})}const u=({children:e,initial:t,isPresent:i,onExitComplete:o,custom:a,presenceAffectsLayout:c,mode:d})=>{const u=(0,r.M)(m),f=(0,n.useId)(),h=(0,n.useCallback)((e=>{u.set(e,!0);for(const e of u.values())if(!e)return;o&&o()}),[u,o]),y=(0,n.useMemo)((()=>({id:f,initial:t,isPresent:i,custom:a,onExitComplete:h,register:e=>(u.set(e,!1),()=>u.delete(e))})),c?[Math.random(),h]:[i,h]);return(0,n.useMemo)((()=>{u.forEach(((e,t)=>u.set(t,!1)))}),[i]),n.useEffect((()=>{!i&&!u.size&&o&&o()}),[i]),"popLayout"===d&&(e=(0,s.jsx)(p,{isPresent:i,children:e})),(0,s.jsx)(l.t.Provider,{value:y,children:e})};function m(){return new Map}var f=i(9120);const h=e=>e.key||"";function y(e){const t=[];return n.Children.forEach(e,(e=>{(0,n.isValidElement)(e)&&t.push(e)})),t}var v=i(5128);const g=({children:e,custom:t,initial:i=!0,onExitComplete:o,presenceAffectsLayout:l=!0,mode:c="sync",propagate:d=!1})=>{const[p,m]=(0,f.xQ)(d),g=(0,n.useMemo)((()=>y(e)),[e]),E=d&&!p?[]:g.map(h),x=(0,n.useRef)(!0),C=(0,n.useRef)(g),P=(0,r.M)((()=>new Map)),[w,b]=(0,n.useState)(g),[k,R]=(0,n.useState)(g);(0,v.E)((()=>{x.current=!1,C.current=g;for(let e=0;e<k.length;e++){const t=h(k[e]);E.includes(t)?P.delete(t):!0!==P.get(t)&&P.set(t,!1)}}),[k,E.length,E.join("-")]);const I=[];if(g!==w){let e=[...g];for(let t=0;t<k.length;t++){const i=k[t],n=h(i);E.includes(n)||(e.splice(t,0,i),I.push(i))}return"wait"===c&&I.length&&(e=I),R(y(e)),void b(g)}const{forceRender:M}=(0,n.useContext)(a.L);return(0,s.jsx)(s.Fragment,{children:k.map((e=>{const n=h(e),a=!(d&&!p)&&(g===k||E.includes(n));return(0,s.jsx)(u,{isPresent:a,initial:!(x.current&&!i)&&void 0,custom:a?void 0:t,presenceAffectsLayout:l,mode:c,onExitComplete:a?void 0:()=>{if(!P.has(n))return;P.set(n,!0);let e=!0;P.forEach((t=>{t||(e=!1)})),e&&(null==M||M(),R(C.current),d&&(null==m||m()),o&&o())},children:e},n)}))})},E=[{id:1,type:"image",src:"./assets/Imagerender1.png"},{id:5,type:"image",src:"./assets/Imagerender2.png"},{id:6,type:"image",src:"./assets/Imagerender2.png"},{id:2,type:"video",src:"./assets/portfolio/video1.mp4"},{id:3,type:"poster",src:"./assets/portfolio/poster1.jpg"},{id:4,type:"3d",iframe:"https://your-3d-model-viewer.com/embed/model1"}],x={animate:{transition:{staggerChildren:.1}}},C={initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95}},P={hidden:{opacity:0},visible:{opacity:1},exit:{opacity:0}},w={hidden:{opacity:0,scale:.95},visible:{opacity:1,scale:1},exit:{opacity:0,scale:.95}},b=()=>{const[e,t]=(0,n.useState)("all"),[i,s]=(0,n.useState)(null),a="all"===e?E:E.filter((t=>t.type===e));return(0,n.useEffect)((()=>{document.body.style.overflow=i?"hidden":"auto"}),[i]),n.createElement(o.P.div,{className:"portfolio-modern-section",initial:{opacity:0,y:80},whileInView:{opacity:1,y:0},transition:{duration:1,ease:"easeOut"},viewport:{once:!0,amount:.3}},n.createElement("div",{className:"portfolio-filter-bar"},["all","image","video","poster","3d"].map((i=>n.createElement("button",{key:i,className:"filter-btn ".concat(e===i?"active":""),onClick:()=>t(i)},i.toUpperCase())))),n.createElement(o.P.div,{className:"portfolio-grid",layout:!0,variants:x,initial:"initial",animate:"animate"},n.createElement(g,{mode:"wait"},a.map((e=>n.createElement(o.P.div,{key:e.id,className:"portfolio-card",onClick:()=>s(e),layout:!0,variants:C,transition:{duration:.4,ease:"easeInOut"}},"image"===e.type||"poster"===e.type?n.createElement("img",{src:e.src,alt:""}):"video"===e.type?n.createElement("video",{src:e.src,muted:!0,autoPlay:!0,loop:!0}):n.createElement("div",{className:"model-placeholder"},"3D")))))),n.createElement(g,null,i&&n.createElement(o.P.div,{className:"portfolio-modal",onClick:()=>s(null),variants:P,initial:"hidden",animate:"visible",exit:"exit",transition:{duration:.3,ease:"easeOut"}},n.createElement(o.P.div,{className:"modal-inner",onClick:e=>e.stopPropagation(),variants:w,initial:"hidden",animate:"visible",exit:"exit",transition:{duration:.3,ease:"easeOut"}},"3d"===i.type?n.createElement("iframe",{src:i.iframe,frameBorder:"0",allowFullScreen:!0,title:"3D Model"}):"video"===i.type?n.createElement("video",{src:i.src,controls:!0,autoPlay:!0}):n.createElement("img",{src:i.src,alt:"full"})))))}}}]);
//# sourceMappingURL=303.80766d2dc8079c921785.js.map