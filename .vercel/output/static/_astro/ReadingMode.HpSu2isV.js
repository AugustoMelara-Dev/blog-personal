import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as o}from"./index.CVf8TyFT.js";import{A as a}from"./index.CLE0a8i9.js";import{m as i}from"./proxy.BVgIP360.js";function m(){const[t,r]=o.useState(!1);return o.useEffect(()=>(t?document.body.classList.add("reading-mode-active"):document.body.classList.remove("reading-mode-active"),()=>{document.body.classList.remove("reading-mode-active")}),[t]),e.jsxs(e.Fragment,{children:[t&&e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
        `}}),e.jsx("div",{className:"fixed bottom-8 right-8 z-50",children:e.jsx("button",{onClick:()=>r(!t),title:t?"Salir":"Modo lectura",className:"flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] border border-[#1f1f1f] text-[#a3a3a3] hover:border-lime-400/30 hover:text-lime-400 shadow-lg transition-colors duration-300 relative",children:e.jsx(a,{mode:"wait",children:t?e.jsxs(i.svg,{initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:90},transition:{duration:.2},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]},"close"):e.jsxs(i.svg,{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.5},transition:{duration:.2},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),e.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]},"book")})})})]})}export{m as default};
