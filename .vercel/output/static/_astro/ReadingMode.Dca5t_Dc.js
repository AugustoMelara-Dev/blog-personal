import{j as i}from"./jsx-runtime.TBa3i5EZ.js";import{r as e}from"./index.CVf8TyFT.js";import{M as A,u as L,P as S,k as H,e as $,L as B,m as R}from"./proxy.BVgIP360.js";class T extends e.Component{getSnapshotBeforeUpdate(r){const n=this.props.childRef.current;if(n&&r.isPresent&&!this.props.isPresent){const o=this.props.sizeRef.current;o.height=n.offsetHeight||0,o.width=n.offsetWidth||0,o.top=n.offsetTop,o.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function W({children:t,isPresent:r}){const n=e.useId(),o=e.useRef(null),g=e.useRef({width:0,height:0,top:0,left:0}),{nonce:h}=e.useContext(A);return e.useInsertionEffect(()=>{const{width:u,height:a,top:m,left:s}=g.current;if(r||!o.current||!u||!a)return;o.current.dataset.motionPopId=n;const c=document.createElement("style");return h&&(c.nonce=h),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${a}px !important;
            top: ${m}px !important;
            left: ${s}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[r]),i.jsx(T,{isPresent:r,childRef:o,sizeRef:g,children:e.cloneElement(t,{ref:o})})}const _=({children:t,initial:r,isPresent:n,onExitComplete:o,custom:g,presenceAffectsLayout:h,mode:u})=>{const a=L(D),m=e.useId(),s=e.useCallback(f=>{a.set(f,!0);for(const y of a.values())if(!y)return;o&&o()},[a,o]),c=e.useMemo(()=>({id:m,initial:r,isPresent:n,custom:g,onExitComplete:s,register:f=>(a.set(f,!1),()=>a.delete(f))}),h?[Math.random(),s]:[n,s]);return e.useMemo(()=>{a.forEach((f,y)=>a.set(y,!1))},[n]),e.useEffect(()=>{!n&&!a.size&&o&&o()},[n]),u==="popLayout"&&(t=i.jsx(W,{isPresent:n,children:t})),i.jsx(S.Provider,{value:c,children:t})};function D(){return new Map}const C=t=>t.key||"";function E(t){const r=[];return e.Children.forEach(t,n=>{e.isValidElement(n)&&r.push(n)}),r}const F=({children:t,custom:r,initial:n=!0,onExitComplete:o,presenceAffectsLayout:g=!0,mode:h="sync",propagate:u=!1})=>{const[a,m]=H(u),s=e.useMemo(()=>E(t),[t]),c=u&&!a?[]:s.map(C),f=e.useRef(!0),y=e.useRef(s),v=L(()=>new Map),[z,P]=e.useState(s),[p,k]=e.useState(s);$(()=>{f.current=!1,y.current=s;for(let l=0;l<p.length;l++){const d=C(p[l]);c.includes(d)?v.delete(d):v.get(d)!==!0&&v.set(d,!1)}},[p,c.length,c.join("-")]);const w=[];if(s!==z){let l=[...s];for(let d=0;d<p.length;d++){const x=p[d],b=C(x);c.includes(b)||(l.splice(d,0,x),w.push(x))}h==="wait"&&w.length&&(l=w),k(E(l)),P(s);return}const{forceRender:j}=e.useContext(B);return i.jsx(i.Fragment,{children:p.map(l=>{const d=C(l),x=u&&!a?!1:s===p||c.includes(d),b=()=>{if(v.has(d))v.set(d,!0);else return;let M=!0;v.forEach(I=>{I||(M=!1)}),M&&(j?.(),k(y.current),u&&m?.(),o&&o())};return i.jsx(_,{isPresent:x,initial:!f.current||n?void 0:!1,custom:x?void 0:r,presenceAffectsLayout:g,mode:h,onExitComplete:x?void 0:b,children:l},d)})})};function G(){const[t,r]=e.useState(!1);return e.useEffect(()=>(t?document.body.classList.add("reading-mode-active"):document.body.classList.remove("reading-mode-active"),()=>{document.body.classList.remove("reading-mode-active")}),[t]),i.jsxs(i.Fragment,{children:[t&&i.jsx("style",{dangerouslySetInnerHTML:{__html:`
          body.reading-mode-active {
            background-color: #050505 !important;
            transition: background-color 0.5s ease;
          }
          body.reading-mode-active header {
            display: none !important;
          }
          body.reading-mode-active footer {
            display: none !important;
          }
          body.reading-mode-active main {
            display: flex;
            justify-content: center;
          }
          body.reading-mode-active article {
            max-width: 70ch !important;
            width: 100%;
            margin: 0 auto !important;
            padding-top: 4rem !important;
            padding-bottom: 8rem !important;
          }
          body.reading-mode-active .prose {
            font-size: 1.2rem !important;
            transition: font-size 0.3s ease;
          }
        `}}),i.jsx("div",{className:"fixed bottom-8 right-8 z-50",children:i.jsx("button",{onClick:()=>r(!t),title:t?"Salir":"Modo lectura",className:"flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] border border-[#1f1f1f] text-[#a3a3a3] hover:border-lime-400/30 hover:text-lime-400 shadow-lg transition-colors duration-300 relative",children:i.jsx(F,{mode:"wait",children:t?i.jsxs(R.svg,{initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:90},transition:{duration:.2},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[i.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),i.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]},"close"):i.jsxs(R.svg,{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.5},transition:{duration:.2},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[i.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),i.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]},"book")})})})]})}export{G as default};
