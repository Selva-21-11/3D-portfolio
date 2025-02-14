(()=>{"use strict";var e,t,a,n,r,l={6875:(e,t,a)=>{var n=a(6540),r=a(5338),l=a(2555);function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t,a){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const s=e=>{let{text:t="",className:a="",delay:r=100,animationFrom:i={opacity:0,transform:"translate3d(0,40px,0)"},animationTo:c={opacity:1,transform:"translate3d(0,0,0)"},easing:s="easeOutCubic",threshold:d=.1,rootMargin:u="-100px",textAlign:f="center",onLetterAnimationComplete:m}=e;const p=t.split(" ").map((e=>e.split(""))),b=p.flat(),[g,y]=(0,n.useState)(!1),h=(0,n.useRef)(),v=(0,n.useRef)(0);(0,n.useEffect)((()=>{const e=new IntersectionObserver((t=>{let[a]=t;a.isIntersecting&&(y(!0),e.unobserve(h.current))}),{threshold:d,rootMargin:u});return e.observe(h.current),()=>e.disconnect()}),[d,u]);const E=(0,l.mX)(b.length,b.map(((e,t)=>({from:i,to:g?async e=>{await e(c),v.current+=1,v.current===b.length&&m&&m()}:i,delay:t*r,config:{easing:s}}))));return n.createElement("p",{ref:h,className:"split-parent ".concat(a),style:{textAlign:f,overflow:"hidden",display:"inline",whiteSpace:"normal",wordWrap:"break-word"}},p.map(((e,t)=>n.createElement("span",{key:t,style:{display:"inline-block",whiteSpace:"nowrap"}},e.map(((e,a)=>{const r=p.slice(0,t).reduce(((e,t)=>e+t.length),0)+a;return n.createElement(l.CS.span,{key:r,style:o(o({},E[r]),{},{display:"inline-block",willChange:"transform, opacity"})},e)})),n.createElement("span",{style:{display:"inline-block",width:"0.3em"}}," ")))))};a(6848);var d=a(8874);const u=e=>{let{text:t,bottom:a="0px",left:r="0px",fontSize:l="2rem"}=e;const[i,o]=(0,n.useState)(!1);return n.createElement("div",{style:{overflow:"hidden",display:"inline-block",position:"relative",bottom:a,left:r,cursor:"pointer",fontSize:l,height:"1.2em",width:"auto"},onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)},n.createElement(d.P.div,{initial:{y:"100%"},animate:i?{y:"-100%"}:{y:"0%"},transition:{duration:.6,ease:"easeOut"},style:{position:"relative",display:"inline-block",whiteSpace:"nowrap"}},t),n.createElement(d.P.div,{initial:{y:"100%"},animate:i?{y:"0%"}:{y:"100%"},transition:{duration:.6,ease:"easeOut"},style:{position:"absolute",top:0,left:0,display:"inline-block",whiteSpace:"nowrap"}},t))},f=n.lazy((()=>Promise.all([a.e(922),a.e(437),a.e(880),a.e(543),a.e(267)]).then(a.bind(a,5267)))),m=n.lazy((()=>a.e(436).then(a.bind(a,5436)))),p=n.lazy((()=>Promise.all([a.e(880),a.e(314)]).then(a.bind(a,2314)))),b=n.lazy((()=>Promise.all([a.e(922),a.e(437),a.e(589),a.e(132),a.e(845),a.e(277)]).then(a.bind(a,8277)))),g=n.lazy((()=>Promise.all([a.e(31),a.e(402)]).then(a.bind(a,8402)))),y=n.lazy((()=>Promise.all([a.e(589),a.e(520),a.e(27),a.e(309)]).then(a.bind(a,1309)))),h=n.lazy((()=>a.e(907).then(a.bind(a,5907)))),v=n.memo(b),E=n.memo(g),w=n.memo(y),O=n.memo(h),S=()=>n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading...")},n.createElement("div",{className:"container"},n.createElement("section",{className:"hero",id:"hero"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:6,color:{r:1,g:.5,b:.1},glowRadiusX:.5,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:1.2,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading title...")},n.createElement(f,null)),n.createElement("div",{className:"hero-content"},n.createElement("h1",{className:"first-line"},n.createElement(s,{text:"DISCOVER",animation:"fadeIn",delay:50})),n.createElement("h2",{className:"second-line"},n.createElement(s,{text:"THIRD DIMENSION!",animation:"fadeIn",delay:50})),n.createElement(u,{text:"Scroll down to discover",bottom:"0px",left:"30px",fontSize:"1.5rem"}))),n.createElement("section",{id:"skills"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:-10,color:{r:.1,g:.5,b:1},glowRadiusX:.3,glowRadiusY:.2,intensity:0,opacity:.5,fadeDuration:2,lightDirection:-0,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading skills...")},n.createElement(m,null))),n.createElement("div",{className:"section-divider-skill"},n.createElement("h2",{className:"section-line-skill"},"My"),n.createElement("h2",{className:"section-line-skill"},"Works"),n.createElement("h3",{className:"section-subline-skill"},"Explore my projects below")),n.createElement("section",{id:"models"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:6,color:{r:1,g:.5,b:.1},glowRadiusX:.5,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:1.2,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(v,null)),n.createElement("section",{id:"image-renders"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:-5,color:{r:.1,g:.5,b:1},glowRadiusX:.3,glowRadiusY:.2,intensity:0,opacity:.5,fadeDuration:2,lightDirection:-0,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(E,null)),n.createElement("section",{id:"video-renders"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:6,color:{r:1,g:.5,b:.1},glowRadiusX:.5,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:1.2,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(w,null)),n.createElement("div",{className:"section-divider-contact"},n.createElement("h2",{className:"section-line-contact"},"Get In"),n.createElement("h2",{className:"section-line-contact"},"Touch"),n.createElement("h3",{className:"section-subline-contact"},"Reach out to me below")),n.createElement("section",{id:"contact"},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading light...")},n.createElement(p,{initialX:-5,color:{r:.1,g:.5,b:1},glowRadiusX:.4,glowRadiusY:.3,intensity:0,opacity:.5,fadeDuration:2,lightDirection:-0,wiggleAmount:100,verticalWiggleAmount:100,wiggleSpeed:8})),n.createElement(O,null))));r.createRoot(document.getElementById("root")).render(n.createElement(n.StrictMode,null,n.createElement(S,null)))}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var a=i[e]={id:e,loaded:!1,exports:{}};return l[e].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}o.m=l,e=[],o.O=(t,a,n,r)=>{if(!a){var l=1/0;for(d=0;d<e.length;d++){a=e[d][0],n=e[d][1],r=e[d][2];for(var i=!0,c=0;c<a.length;c++)(!1&r||l>=r)&&Object.keys(o.O).every((e=>o.O[e](a[c])))?a.splice(c--,1):(i=!1,r<l&&(l=r));if(i){e.splice(d--,1);var s=n();void 0!==s&&(t=s)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,n,r]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},a=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var r=Object.create(null);o.r(r);var l={};t=t||[null,a({}),a([]),a(a)];for(var i=2&n&&e;"object"==typeof i&&!~t.indexOf(i);i=a(i))Object.getOwnPropertyNames(i).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,o.d(r,l),r},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,a)=>(o.f[a](e,t),t)),[])),o.u=e=>(({42:"reactPlayerTwitch",173:"reactPlayerVimeo",328:"reactPlayerDailyMotion",340:"reactPlayerWistia",353:"reactPlayerPreview",392:"reactPlayerVidyard",446:"reactPlayerYouTube",458:"reactPlayerFilePlayer",463:"reactPlayerKaltura",570:"reactPlayerMixcloud",627:"reactPlayerStreamable",723:"reactPlayerMux",887:"reactPlayerFacebook",979:"reactPlayerSoundCloud"}[e]||e)+"."+{27:"038c7db774ecebdc050a",31:"55b565b67ad272eafeee",42:"2427c062eb91ca8b672c",132:"5d13c1f5301f7f052516",173:"224f2b28f4cd86bcdfd5",267:"df6b51aaaf62f4c76a05",277:"9f5c72e86abb048836a5",309:"7c4a584cef4419fb5fd1",314:"e527c7548a4277f0aa00",328:"c7d22eaae0b4ec4fe58e",340:"7249345afdf15ccef34c",353:"317ec1322f999b5b07c4",392:"cb782746f317b4fb3fba",402:"f56ea36771c29b4ce3e4",436:"3fda14f05c12407b7385",437:"e59729bf402f031fc183",446:"e3f4b4abef4dba96d3b7",458:"4f0a755132526fb65ca3",463:"6f094927ed8e377f8960",520:"72ca2d75b3fe12a9e8dd",543:"db09b96fc9feef562191",570:"a0d3532d44da4443dc5a",589:"10b16c00970a648a567b",627:"ed648aa6ebfe62cda1ce",723:"d23fa437542a6376478e",845:"5d1a71b383d976b17f0b",880:"805b9768bcfa24b1d9d2",887:"44ddccbd2fdea5640e3a",907:"d81b3e6fcd13bcf5e2e8",922:"e446fdc974d289688d62",979:"4f0466beff8ffc683cad"}[e]+".js"),o.miniCssF=e=>e+"."+{402:"1b56f4292678e8ae9aa8",436:"019f3388dc39dc1f4af0"}[e]+".css",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},r="my-3d-portfolio:",o.l=(e,t,a,l)=>{if(n[e])n[e].push(t);else{var i,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var u=s[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+a){i=u;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.setAttribute("data-webpack",r+a),i.src=e),n[e]=[t];var f=(t,a)=>{i.onerror=i.onload=null,clearTimeout(m);var r=n[e];if(delete n[e],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((e=>e(a))),t)return t(a)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),c&&document.head.appendChild(i)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),o.p="/3D-portfolio/",(()=>{if("undefined"!=typeof document){var e=e=>new Promise(((t,a)=>{var n=o.miniCssF(e),r=o.p+n;if(((e,t)=>{for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var r=(i=a[n]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(r===e||r===t))return i}var l=document.getElementsByTagName("style");for(n=0;n<l.length;n++){var i;if((r=(i=l[n]).getAttribute("data-href"))===e||r===t)return i}})(n,r))return t();((e,t,a,n,r)=>{var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",o.nc&&(l.nonce=o.nc),l.onerror=l.onload=a=>{if(l.onerror=l.onload=null,"load"===a.type)n();else{var i=a&&a.type,o=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+o+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=o,l.parentNode&&l.parentNode.removeChild(l),r(c)}},l.href=t,a?a.parentNode.insertBefore(l,a.nextSibling):document.head.appendChild(l)})(e,r,null,t,a)})),t={792:0};o.f.miniCss=(a,n)=>{t[a]?n.push(t[a]):0!==t[a]&&{402:1,436:1}[a]&&n.push(t[a]=e(a).then((()=>{t[a]=0}),(e=>{throw delete t[a],e})))}}})(),(()=>{var e={792:0};o.f.j=(t,a)=>{var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)a.push(n[2]);else{var r=new Promise(((a,r)=>n=e[t]=[a,r]));a.push(n[2]=r);var l=o.p+o.u(t),i=new Error;o.l(l,(a=>{if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var r=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+l+")",i.name="ChunkLoadError",i.type=r,i.request=l,n[1](i)}}),"chunk-"+t,t)}},o.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,l=a[0],i=a[1],c=a[2],s=0;if(l.some((t=>0!==e[t]))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(c)var d=c(o)}for(t&&t(a);s<l.length;s++)r=l[s],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},a=self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var c=o.O(void 0,[736,758,451,218,287,781,494],(()=>o(6875)));c=o.O(c)})();
//# sourceMappingURL=main.8987672bee8c92f3e540.js.map