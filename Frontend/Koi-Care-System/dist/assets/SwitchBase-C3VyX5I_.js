import{E as J,F as M,G as C,a2 as $,al as A,r as D,a6 as H,J as K,j as w,M as Q,N as T,O as V}from"./index-DsR5MBtH.js";function W(s){return J("PrivateSwitchBase",s)}M("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const X=s=>{const{classes:t,checked:c,disabled:r,edge:a}=s,l={root:["root",c&&"checked",r&&"disabled",a&&`edge${T(a)}`],input:["input"]};return V(l,W,t)},Y=C($)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:s,ownerState:t})=>s==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:s,ownerState:t})=>s==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Z=C("input",{shouldForwardProp:A})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),ee=D.forwardRef(function(t,c){const{autoFocus:r,checked:a,checkedIcon:l,className:y,defaultChecked:u,disabled:F,disableFocusRipple:p=!1,edge:S=!1,icon:x,id:R,inputProps:P,inputRef:v,name:z,onBlur:h,onChange:f,onFocus:g,readOnly:I,required:E=!1,tabIndex:j,type:i,value:m,...N}=t,[B,U]=H({controlled:a,default:!!u,name:"SwitchBase",state:"checked"}),o=K(),L=e=>{g&&g(e),o&&o.onFocus&&o.onFocus(e)},O=e=>{h&&h(e),o&&o.onBlur&&o.onBlur(e)},q=e=>{if(e.nativeEvent.defaultPrevented)return;const k=e.target.checked;U(k),f&&f(e,k)};let n=F;o&&typeof n>"u"&&(n=o.disabled);const G=i==="checkbox"||i==="radio",d={...t,checked:B,disabled:n,disableFocusRipple:p,edge:S},b=X(d);return w.jsxs(Y,{component:"span",className:Q(b.root,y),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:L,onBlur:O,ownerState:d,ref:c,...N,children:[w.jsx(Z,{autoFocus:r,checked:a,defaultChecked:u,className:b.input,disabled:n,id:G?R:void 0,name:z,onChange:q,readOnly:I,ref:v,required:E,ownerState:d,tabIndex:j,type:i,...i==="checkbox"&&m===void 0?{}:{value:m},...P}),B?l:x]})});export{ee as S};
