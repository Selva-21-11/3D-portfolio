"use strict";(self.webpackChunkmy_3d_portfolio=self.webpackChunkmy_3d_portfolio||[]).push([[267],{5267:(e,n,t)=>{t.r(n),t.d(n,{default:()=>w});var o=t(6540),i=t(9437),s=t(5880),r=t(2543),d=t(7992),a=t(5804),u=t(8709);const w=()=>{const e=(0,o.useRef)(null),n=(0,o.useRef)(null),t=(0,o.useRef)(null),w=(0,o.useRef)(null),l=(0,o.useRef)(null),c=(0,o.useRef)(null),[p,m]=(0,o.useState)(!0);return(0,o.useEffect)((()=>{const o=new i.Z58,h=window.innerWidth/window.innerHeight,f=new i.qUd(-2*h,2*h,2,-2,.1,1e3),g=new i.JeP({antialias:!0,preserveDrawingBuffer:!0});g.setSize(window.innerWidth,window.innerHeight),g.outputEncoding=i.S2Q,g.physicallyCorrectLights=!0,document.getElementById("hero").appendChild(g.domElement),n.current=g,t.current=f,e.current=o,f.position.z=5;const v=new i.KPJ;v.onStart=()=>console.log("Loading started..."),v.onLoad=()=>{console.log("Loading complete!"),m(!1),s.os.fromTo(w.current.scale,{x:0,y:0,z:0},{x:1,y:1,z:1,duration:1,ease:"power3.out"}),s.os.fromTo(l.current.scale,{x:0,y:0,z:0},{x:1,y:1,z:1,duration:1,ease:"power3.out"})};const y=new i.Tap(v).load("/assets/mattext.png"),z=new i.FNr({matcap:y}),E=new i.Gu$(1,32,32),L=new i.Gu$(.3,32,32),x=new i.eaF(E,z),P=new i.eaF(L,z),R=new i.YJl;R.add(x),R.add(P),o.add(R),w.current=x,l.current=P;const S=new i.$p8(16777215,.5);o.add(S);const H=(0,r.throttle)((e=>{const n=e.clientX/window.innerWidth*2-1,t=e.clientY/window.innerHeight*2-1,o=.1*n,i=.1*t;s.os.to(f.position,{x:o,y:i,z:5,duration:.6,ease:"power3.out"});const r=1*Math.cos(n*Math.PI),d=1*Math.sin(t*Math.PI);s.os.to(P.position,{x:r,y:d,z:-1,duration:.5,ease:"power3.out"})}),100);window.addEventListener("mousemove",H);const M=new d.s(g);M.addPass(new a.A(o,f)),M.addPass(new u.S(.2,.05,648,!1)),c.current=M;const W=()=>{p||M.render(),requestAnimationFrame(W)};W();const k=()=>{const e=window.innerWidth/window.innerHeight;f.left=-2*e,f.right=2*e,f.top=2,f.bottom=-2,f.updateProjectionMatrix(),g.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",k),()=>{window.removeEventListener("resize",k),window.removeEventListener("mousemove",H),y.dispose(),E.dispose(),L.dispose(),x.material.dispose(),P.material.dispose(),c.current&&c.current.dispose(),o.clear(),g.dispose()}}),[p]),o.createElement("div",null,p&&o.createElement("div",{className:"loading-screen"},o.createElement("h3",null,"Loading...")))}}}]);
//# sourceMappingURL=267.bundle.js.map