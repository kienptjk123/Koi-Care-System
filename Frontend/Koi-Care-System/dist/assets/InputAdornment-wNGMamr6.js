import{E,F as C,G as I,H as A,r as h,I as P,J as j,j as a,K as L,M as S,N as c,O as z}from"./index-D0YIHR4A.js";import{T as R}from"./Typography-CvIXc89m.js";function $(t){return E("MuiInputAdornment",t)}const w=C("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),f=w;var b;const F=(t,n)=>{const{ownerState:e}=t;return[n.root,n[`position${c(e.position)}`],e.disablePointerEvents===!0&&n.disablePointerEvents,n[e.variant]]},M=t=>{const{classes:n,disablePointerEvents:e,hiddenLabel:i,position:s,size:r,variant:l}=t,p={root:["root",e&&"disablePointerEvents",s&&`position${c(s)}`,l,i&&"hiddenLabel",r&&`size${c(r)}`]};return z(p,$,n)},T=I("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:F})(A(({theme:t})=>({display:"flex",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active,variants:[{props:{variant:"filled"},style:{[`&.${f.positionStart}&:not(.${f.hiddenLabel})`]:{marginTop:16}}},{props:{position:"start"},style:{marginRight:8}},{props:{position:"end"},style:{marginLeft:8}},{props:{disablePointerEvents:!0},style:{pointerEvents:"none"}}]}))),H=h.forwardRef(function(n,e){const i=P({props:n,name:"MuiInputAdornment"}),{children:s,className:r,component:l="div",disablePointerEvents:p=!1,disableTypography:x=!1,position:m,variant:u,...g}=i,o=j()||{};let d=u;u&&o.variant,o&&!d&&(d=o.variant);const v={...i,hiddenLabel:o.hiddenLabel,size:o.size,disablePointerEvents:p,position:m,variant:d},y=M(v);return a.jsx(L.Provider,{value:null,children:a.jsx(T,{as:l,ownerState:v,className:S(y.root,r),ref:e,...g,children:typeof s=="string"&&!x?a.jsx(R,{color:"textSecondary",children:s}):a.jsxs(h.Fragment,{children:[m==="start"?b||(b=a.jsx("span",{className:"notranslate",children:"​"})):null,s]})})})});export{H as I};
