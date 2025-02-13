"use strict";(self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[]).push([[646],{7646:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var n=a(6540),s=a(3295),r=a(9462),i=a(2294);const o={damping:30,stiffness:100,mass:2};function l(e){let{imageSrc:t,altText:a="Tilted card image",captionText:l="",containerHeight:c="180px",containerWidth:p="180px",imageHeight:g="180px",imageWidth:d="180px",scaleOnHover:m=1.1,rotateAmplitude:u=14,showMobileWarning:h=!0,showTooltip:f=!0,overlayContent:v=null,displayOverlayContent:x=!1,progressBarValue:E=70}=e;const y=(0,n.useRef)(null),T=(0,s.d)(),B=(0,s.d)(),S=(0,r.z)((0,s.d)(0),o),b=(0,r.z)((0,s.d)(0),o),k=(0,r.z)(1,o),w=(0,r.z)(0),N=(0,r.z)(0,{stiffness:350,damping:30,mass:1}),V=(0,r.z)(1,o),[C,P]=(0,n.useState)(0);return n.createElement("figure",{ref:y,className:"tilted-card-figure",style:{height:c,width:p},onMouseMove:function(e){if(!y.current)return;const t=y.current.getBoundingClientRect(),a=e.clientX-t.left-t.width/2,n=e.clientY-t.top-t.height/2,s=n/(t.height/2)*-u,r=a/(t.width/2)*u;S.set(s),b.set(r),T.set(e.clientX-t.left),B.set(e.clientY-t.top);const i=n-C;N.set(.6*-i),P(n)},onMouseEnter:function(){k.set(m),w.set(1),V.set(1.2)},onMouseLeave:function(){w.set(0),k.set(1),S.set(0),b.set(0),N.set(0),V.set(1)}},h&&n.createElement("div",{className:"tilted-card-mobile-alert"},"This effect is not optimized for mobile. Check on desktop."),n.createElement(i.P.div,{className:"tilted-card-inner",style:{width:d,height:g,rotateX:S,rotateY:b,scale:k}},n.createElement(i.P.img,{src:t,alt:a,className:"tilted-card-img",style:{width:d,height:g}}),x&&v&&n.createElement(i.P.div,{className:"tilted-card-overlay"},v)),n.createElement(i.P.div,{className:"progress-bar-container",style:{rotateX:S,rotateY:b,scale:V,opacity:w,transformStyle:"preserve-3d"}},n.createElement(i.P.div,{className:"progress-bar-fill",style:{width:"".concat(E,"%"),backgroundColor:"#4caf50",height:"100%",borderRadius:"5px"}})),f&&n.createElement(i.P.figcaption,{className:"tilted-card-caption",style:{x:T,y:B,opacity:w,rotate:N}},l))}const c=()=>{const e=(0,n.useRef)(null);return(0,n.useEffect)((()=>{const t=e.current,a=t=>{requestAnimationFrame((()=>(t=>{const{clientX:a,clientY:n}=t,{offsetWidth:s,offsetHeight:r}=e.current,i=s/2,o=r/2,l=(a-i)/i,c=(n-o)/o;e.current.style.transform="perspective(1200px) rotateX(".concat(2*c,"deg) rotateY(").concat(2*l,"deg)")})(t)))};return t.addEventListener("mousemove",a),()=>{t.removeEventListener("mousemove",a)}}),[]),n.createElement("section",{className:"skills-section",ref:e},n.createElement("div",{className:"skills-container-wrapper"},n.createElement("div",{className:"skills-container"},[{imageSrc:"./assets/Blender.png",captionText:"Blender",progressBarValue:80},{imageSrc:"/assets/unreal-engine.png",captionText:"Unreal Engine",progressBarValue:60},{imageSrc:"/assets/adobe-photoshop.png",captionText:"Photoshop",progressBarValue:80},{imageSrc:"/assets/adobe-photoshop.png",captionText:"Photoshop",progressBarValue:80},{imageSrc:"/assets/unreal-engine.png",captionText:"Unreal Engine",progressBarValue:60},{imageSrc:"/assets/unreal-engine.png",captionText:"Unreal Engine",progressBarValue:60},{imageSrc:"/assets/unreal-engine.png",captionText:"Unreal Engine",progressBarValue:60},{imageSrc:"/assets/unreal-engine.png",captionText:"Unreal Engine",progressBarValue:60}].map(((e,t)=>n.createElement(l,{key:t,imageSrc:e.imageSrc,captionText:e.captionText,progressBarValue:e.progressBarValue,containerHeight:"200px",containerWidth:"200px",scaleOnHover:1.1,rotateAmplitude:14,displayOverlayContent:!0,overlayContent:n.createElement("div",null,e.captionText)}))))))}}}]);
//# sourceMappingURL=646.bundle.js.map