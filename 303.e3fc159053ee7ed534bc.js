"use strict";(self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[]).push([[303],{4303:(e,t,n)=>{n.r(t),n.d(t,{default:()=>P});var i=n(6540),a=n(2058),s=n(4848),o=n(9473),r=n(8601),l=n(6719),c=n(5446);class d extends i.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function p({children:e,isPresent:t}){const n=(0,i.useId)(),a=(0,i.useRef)(null),o=(0,i.useRef)({width:0,height:0,top:0,left:0}),{nonce:r}=(0,i.useContext)(c.Q);return(0,i.useInsertionEffect)((()=>{const{width:e,height:i,top:s,left:l}=o.current;if(t||!a.current||!e||!i)return;a.current.dataset.motionPopId=n;const c=document.createElement("style");return r&&(c.nonce=r),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`\n          [data-motion-pop-id="${n}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${i}px !important;\n            top: ${s}px !important;\n            left: ${l}px !important;\n          }\n        `),()=>{document.head.removeChild(c)}}),[t]),(0,s.jsx)(d,{isPresent:t,childRef:a,sizeRef:o,children:i.cloneElement(e,{ref:a})})}const m=({children:e,initial:t,isPresent:n,onExitComplete:a,custom:o,presenceAffectsLayout:c,mode:d})=>{const m=(0,r.M)(u),f=(0,i.useId)(),h=(0,i.useCallback)((e=>{m.set(e,!0);for(const e of m.values())if(!e)return;a&&a()}),[m,a]),y=(0,i.useMemo)((()=>({id:f,initial:t,isPresent:n,custom:o,onExitComplete:h,register:e=>(m.set(e,!1),()=>m.delete(e))})),c?[Math.random(),h]:[n,h]);return(0,i.useMemo)((()=>{m.forEach(((e,t)=>m.set(t,!1)))}),[n]),i.useEffect((()=>{!n&&!m.size&&a&&a()}),[n]),"popLayout"===d&&(e=(0,s.jsx)(p,{isPresent:n,children:e})),(0,s.jsx)(l.t.Provider,{value:y,children:e})};function u(){return new Map}var f=n(9120);const h=e=>e.key||"";function y(e){const t=[];return i.Children.forEach(e,(e=>{(0,i.isValidElement)(e)&&t.push(e)})),t}var g=n(5128);const v=({children:e,custom:t,initial:n=!0,onExitComplete:a,presenceAffectsLayout:l=!0,mode:c="sync",propagate:d=!1})=>{const[p,u]=(0,f.xQ)(d),v=(0,i.useMemo)((()=>y(e)),[e]),E=d&&!p?[]:v.map(h),x=(0,i.useRef)(!0),C=(0,i.useRef)(v),w=(0,r.M)((()=>new Map)),[b,P]=(0,i.useState)(v),[k,I]=(0,i.useState)(v);(0,g.E)((()=>{x.current=!1,C.current=v;for(let e=0;e<k.length;e++){const t=h(k[e]);E.includes(t)?w.delete(t):!0!==w.get(t)&&w.set(t,!1)}}),[k,E.length,E.join("-")]);const M=[];if(v!==b){let e=[...v];for(let t=0;t<k.length;t++){const n=k[t],i=h(n);E.includes(i)||(e.splice(t,0,n),M.push(n))}return"wait"===c&&M.length&&(e=M),I(y(e)),void P(v)}const{forceRender:N}=(0,i.useContext)(o.L);return(0,s.jsx)(s.Fragment,{children:k.map((e=>{const i=h(e),o=!(d&&!p)&&(v===k||E.includes(i));return(0,s.jsx)(m,{isPresent:o,initial:!(x.current&&!n)&&void 0,custom:o?void 0:t,presenceAffectsLayout:l,mode:c,onExitComplete:o?void 0:()=>{if(!w.has(i))return;w.set(i,!0);let e=!0;w.forEach((t=>{t||(e=!1)})),e&&(null==N||N(),I(C.current),d&&(null==u||u()),a&&a())},children:e},i)}))})},E=[{id:1,type:"image",src:"./assets/Imagerender1.png"},{id:5,type:"image",src:"./assets/Imagerender2.png"},{id:6,type:"image",src:"./assets/Imagerender2.png"},{id:7,type:"image",src:"./assets/Imagerender2.png"},{id:4,type:"3d",iframe:"https://v3d.net/18q9",thumbnail:"../assets/BMW-Config.png"}],x={animate:{transition:{staggerChildren:.1}}},C={initial:{opacity:0,y:0,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:0,scale:.95}},w={hidden:{opacity:0},visible:{opacity:1},exit:{opacity:0}},b={hidden:{opacity:0,scale:.95},visible:{opacity:1,scale:1},exit:{opacity:0,scale:.95}},P=()=>{const[e,t]=(0,i.useState)("all"),[n,s]=(0,i.useState)(null),o="all"===e?E:E.filter((t=>t.type===e));return(0,i.useEffect)((()=>{document.body.style.overflow=n?"hidden":"auto"}),[n]),i.createElement(a.P.div,{className:"portfolio-modern-section",initial:{opacity:0,y:80},whileInView:{opacity:1,y:0},transition:{duration:1,ease:"easeOut"},viewport:{once:!0,amount:.3}},i.createElement("div",{className:"portfolio-filter-bar"},["all","image","video","poster","3d"].map((n=>i.createElement("button",{key:n,className:"filter-btn ".concat(e===n?"active":""),onClick:()=>t(n)},n.toUpperCase())))),i.createElement(a.P.div,{className:"portfolio-grid",layout:!0,variants:x,initial:"initial",animate:"animate"},i.createElement(v,{mode:"wait"},o.map((e=>i.createElement(a.P.div,{key:e.id,className:"portfolio-card",onClick:()=>{"3d"===e.type?window.open(e.iframe,"_blank"):s(e)},layout:!0,variants:C,transition:{duration:.4,ease:"easeInOut"}},"image"===e.type||"poster"===e.type?i.createElement("img",{src:e.src,alt:""}):"video"===e.type||"3d"===e.type?i.createElement("div",{className:"thumbnail-wrapper"},i.createElement("img",{src:e.thumbnail,alt:"".concat(e.type," thumbnail")}),"3d"===e.type&&i.createElement("div",{className:"model-tag"},"3D"),"video"===e.type&&i.createElement("div",{className:"play-icon"},"▶")):null))))),i.createElement(v,null,n&&i.createElement(a.P.div,{className:"portfolio-modal",onClick:()=>s(null),variants:w,initial:"hidden",animate:"visible",exit:"exit",transition:{duration:.3,ease:"easeOut"}},i.createElement(a.P.div,{className:"modal-inner",onClick:e=>e.stopPropagation(),variants:b,initial:"hidden",animate:"visible",exit:"exit",transition:{duration:.3,ease:"easeOut"}},"3d"===n.type?i.createElement("iframe",{src:n.iframe,frameBorder:"0",allowFullScreen:!0,title:"3D Model"}):"video"===n.type?i.createElement("video",{src:n.src,controls:!0,autoPlay:!0}):i.createElement("img",{src:n.src,alt:"full"})))))}}}]);
//# sourceMappingURL=303.e3fc159053ee7ed534bc.js.map