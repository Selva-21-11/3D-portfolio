(()=>{"use strict";var e,t,n,r={9270:(e,t,n)=>{var r=n(6540),a=n(5338),i=n(2555);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const s=e=>{let{text:t="",className:n="",delay:a=100,animationFrom:l={opacity:0,transform:"translate3d(0,40px,0)"},animationTo:c={opacity:1,transform:"translate3d(0,0,0)"},easing:s="easeOutCubic",threshold:d=.1,rootMargin:u="-100px",textAlign:m="center",onLetterAnimationComplete:p}=e;const f=t.split(" ").map((e=>e.split(""))),g=f.flat(),[b,y]=(0,r.useState)(!1),h=(0,r.useRef)(),v=(0,r.useRef)(0);(0,r.useEffect)((()=>{const e=new IntersectionObserver((t=>{let[n]=t;n.isIntersecting&&(y(!0),e.unobserve(h.current))}),{threshold:d,rootMargin:u});return e.observe(h.current),()=>e.disconnect()}),[d,u]);const E=(0,i.mX)(g.length,g.map(((e,t)=>({from:l,to:b?async e=>{await e(c),v.current+=1,v.current===g.length&&p&&p()}:l,delay:t*a,config:{easing:s}}))));return r.createElement("p",{ref:h,className:"split-parent ".concat(n),style:{textAlign:m,overflow:"hidden",display:"inline",whiteSpace:"normal",wordWrap:"break-word"}},f.map(((e,t)=>r.createElement("span",{key:t,style:{display:"inline-block",whiteSpace:"nowrap"}},e.map(((e,n)=>{const a=f.slice(0,t).reduce(((e,t)=>e+t.length),0)+n;return r.createElement(i.CS.span,{key:a,style:o(o({},E[a]),{},{display:"inline-block",willChange:"transform, opacity"})},e)})),r.createElement("span",{style:{display:"inline-block",width:"0.3em"}}," ")))))};var d=n(2058);const u=e=>{let{text:t,bottom:n="0px",left:a="0px",fontSize:i="2rem"}=e;const[l,o]=(0,r.useState)(!1);return r.createElement("div",{style:{overflow:"hidden",display:"inline-block",position:"relative",bottom:n,left:a,cursor:"pointer",fontSize:i,height:"1.2em",width:"auto"},onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)},r.createElement(d.P.div,{initial:{y:"100%"},animate:l?{y:"-100%"}:{y:"0%"},transition:{duration:.6,ease:"easeOut"},style:{position:"relative",display:"inline-block",whiteSpace:"nowrap"}},t),r.createElement(d.P.div,{initial:{y:"100%"},animate:l?{y:"0%"}:{y:"100%"},transition:{duration:.6,ease:"easeOut"},style:{position:"absolute",top:0,left:0,display:"inline-block",whiteSpace:"nowrap"}},t))},m=r.lazy((()=>Promise.all([n.e(880),n.e(543),n.e(922),n.e(437),n.e(267)]).then(n.bind(n,5267)))),p=r.lazy((()=>n.e(859).then(n.bind(n,7859)))),f=r.lazy((()=>n.e(436).then(n.bind(n,5436)))),g=r.lazy((()=>Promise.all([n.e(880),n.e(314)]).then(n.bind(n,2314)))),b=r.lazy((()=>n.e(907).then(n.bind(n,5907)))),y=r.memo(b),h=()=>r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading...")},r.createElement("div",{className:"container"},r.createElement("section",{className:"hero",id:"hero"},r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading light...")},r.createElement(g,{initialX:6,color:{r:1,g:.5,b:.1},glowRadiusX:.5,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:1.2,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading title...")},r.createElement(m,null)),r.createElement("div",{className:"hero-content"},r.createElement("h1",{className:"first-line"},r.createElement(s,{text:"DISCOVER",animation:"fadeIn",delay:50})),r.createElement("h2",{className:"second-line"},r.createElement(s,{text:"THIRD DIMENSION!",animation:"fadeIn",delay:50})),r.createElement(u,{text:"Scroll down to discover",bottom:"0px",left:"30px",fontSize:"1.5rem"}))),r.createElement("section",{id:"about-me","data-title":"About Me"},r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading About Me...")},r.createElement(p,null))),r.createElement("section",{id:"skills","data-title":"Skills"},r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading light...")},r.createElement(g,{initialX:-10,color:{r:.1,g:.5,b:1},glowRadiusX:.3,glowRadiusY:.2,intensity:0,opacity:.5,fadeDuration:2,lightDirection:-0,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading skills...")},r.createElement(f,null))),r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading portfolio...")},r.createElement(PortfolioSection,null)),r.createElement("section",{id:"contact","data-title":"Contact Me"},r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading light...")},r.createElement(g,{initialX:-5,color:{r:.1,g:.5,b:1},glowRadiusX:.4,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:-0,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),r.createElement(y,null))));a.createRoot(document.getElementById("root")).render(r.createElement(r.StrictMode,null,r.createElement(h,null)))}},a={};function i(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={id:e,loaded:!1,exports:{}};return r[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=r,e=[],i.O=(t,n,r,a)=>{if(!n){var l=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],a=e[d][2];for(var o=!0,c=0;c<n.length;c++)(!1&a||l>=a)&&Object.keys(i.O).every((e=>i.O[e](n[c])))?n.splice(c--,1):(o=!1,a<l&&(l=a));if(o){e.splice(d--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,r,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>e+"."+{267:"c8a88a9a16730207c692",314:"e527c7548a4277f0aa00",436:"94821b5ab6e6feea4d44",437:"8a092d5d2605a1ea8d98",543:"db09b96fc9feef562191",859:"8a8532e3cef8ebc5f568",880:"805b9768bcfa24b1d9d2",907:"d81b3e6fcd13bcf5e2e8",922:"3689160f460e6aa37f64"}[e]+".js",i.miniCssF=e=>e+".537f121f8af77b0e0b02.css",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},n="my-3d-portfolio:",i.l=(e,r,a,l)=>{if(t[e])t[e].push(r);else{var o,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var u=s[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==n+a){o=u;break}}o||(c=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,i.nc&&o.setAttribute("nonce",i.nc),o.setAttribute("data-webpack",n+a),o.src=e),t[e]=[r];var m=(n,r)=>{o.onerror=o.onload=null,clearTimeout(p);var a=t[e];if(delete t[e],o.parentNode&&o.parentNode.removeChild(o),a&&a.forEach((e=>e(r))),n)return n(r)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=m.bind(null,o.onerror),o.onload=m.bind(null,o.onload),c&&document.head.appendChild(o)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),i.p="/3D-portfolio/",(()=>{if("undefined"!=typeof document){var e=e=>new Promise(((t,n)=>{var r=i.miniCssF(e),a=i.p+r;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var a=(l=n[r]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(a===e||a===t))return l}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){var l;if((a=(l=i[r]).getAttribute("data-href"))===e||a===t)return l}})(r,a))return t();((e,t,n,r,a)=>{var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",i.nc&&(l.nonce=i.nc),l.onerror=l.onload=n=>{if(l.onerror=l.onload=null,"load"===n.type)r();else{var i=n&&n.type,o=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+o+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=o,l.parentNode&&l.parentNode.removeChild(l),a(c)}},l.href=t,n?n.parentNode.insertBefore(l,n.nextSibling):document.head.appendChild(l)})(e,a,null,t,n)})),t={792:0};i.f.miniCss=(n,r)=>{t[n]?r.push(t[n]):0!==t[n]&&{436:1}[n]&&r.push(t[n]=e(n).then((()=>{t[n]=0}),(e=>{throw delete t[n],e})))}}})(),(()=>{var e={792:0};i.f.j=(t,n)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,a)=>r=e[t]=[n,a]));n.push(r[2]=a);var l=i.p+i.u(t),o=new Error;i.l(l,(n=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),l=n&&n.target&&n.target.src;o.message="Loading chunk "+t+" failed.\n("+a+": "+l+")",o.name="ChunkLoadError",o.type=a,o.request=l,r[1](o)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,l=n[0],o=n[1],c=n[2],s=0;if(l.some((t=>0!==e[t]))){for(r in o)i.o(o,r)&&(i.m[r]=o[r]);if(c)var d=c(i)}for(t&&t(n);s<l.length;s++)a=l[s],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(d)},n=self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var l=i.O(void 0,[736,758,402,280,159,287,632,929],(()=>i(9270)));l=i.O(l)})();
//# sourceMappingURL=main.92d43c01a5eac02396b8.js.map