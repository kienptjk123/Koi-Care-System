const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/KoiDetail-Csj2QSsY.js","assets/index-CfTJQyAl.js","assets/index-DVDUxeI6.css","assets/index.esm-Tqfafq3a.js","assets/index-I2PFEF8e.js","assets/LeftSideBar-DDUZtTuh.js","assets/index-DqVkHg8o.js","assets/index-DWVl8mFw.js","assets/index-B1zBnQXA.js","assets/logo-DG-ZgLhE.js","assets/Popover-dzxKlUDl.js","assets/createSimplePaletteValueFilter-D-6_72BM.js","assets/Transition-DBChHCkG.js","assets/Typography-DYzreIeS.js","assets/LeftSideBar-DTWD8-pl.css","assets/App-upnbubpd.css","assets/index-CMCoKFFx.js","assets/sweetalert2.esm.all-D3pEHXw3.js","assets/TopLayout-Csj-6t9x.js","assets/aos-B0a9OMnn.css"])))=>i.map(i=>d[i]);
import{c as ie,g as le,d as ce,r as P,j as e,L as de,_ as ue,a as se,B as re}from"./index-CfTJQyAl.js";/* empty css            */import{a as me}from"./index.esm-Tqfafq3a.js";import{L as pe,H as ge}from"./LeftSideBar-DDUZtTuh.js";import{T as fe,m as oe}from"./TopLayout-Csj-6t9x.js";import{S as U}from"./skeleton-Crp1VHQS.js";import"./index-DqVkHg8o.js";import"./index-I2PFEF8e.js";import"./index-DWVl8mFw.js";import"./index-B1zBnQXA.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Popover-dzxKlUDl.js";import"./createSimplePaletteValueFilter-D-6_72BM.js";import"./Transition-DBChHCkG.js";import"./Typography-DYzreIeS.js";var ne={exports:{}};(function(u,ee){(function(L,p){u.exports=p()})(ie,function(){return function(L){function p(a){if(i[a])return i[a].exports;var m=i[a]={exports:{},id:a,loaded:!1};return L[a].call(m.exports,m,m.exports,p),m.loaded=!0,m.exports}var i={};return p.m=L,p.c=i,p.p="dist/",p(0)}([function(L,p,i){function a(r){return r&&r.__esModule?r:{default:r}}var m=Object.assign||function(r){for(var C=1;C<arguments.length;C++){var q=arguments[C];for(var B in q)Object.prototype.hasOwnProperty.call(q,B)&&(r[B]=q[B])}return r},w=i(1),O=(a(w),i(6)),n=a(O),h=i(7),c=a(h),g=i(8),f=a(g),v=i(9),z=a(v),_=i(10),K=a(_),J=i(11),M=a(J),Q=i(14),V=a(Q),E=[],A=!1,y={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},F=function(){var r=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(r&&(A=!0),A)return E=(0,M.default)(E,y),(0,K.default)(E,y.once),E},T=function(){E=(0,V.default)(),F()},s=function(){E.forEach(function(r,C){r.node.removeAttribute("data-aos"),r.node.removeAttribute("data-aos-easing"),r.node.removeAttribute("data-aos-duration"),r.node.removeAttribute("data-aos-delay")})},t=function(r){return r===!0||r==="mobile"&&z.default.mobile()||r==="phone"&&z.default.phone()||r==="tablet"&&z.default.tablet()||typeof r=="function"&&r()===!0},b=function(r){y=m(y,r),E=(0,V.default)();var C=document.all&&!window.atob;return t(y.disable)||C?s():(y.disableMutationObserver||f.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),y.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",y.easing),document.querySelector("body").setAttribute("data-aos-duration",y.duration),document.querySelector("body").setAttribute("data-aos-delay",y.delay),y.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?F(!0):y.startEvent==="load"?window.addEventListener(y.startEvent,function(){F(!0)}):document.addEventListener(y.startEvent,function(){F(!0)}),window.addEventListener("resize",(0,c.default)(F,y.debounceDelay,!0)),window.addEventListener("orientationchange",(0,c.default)(F,y.debounceDelay,!0)),window.addEventListener("scroll",(0,n.default)(function(){(0,K.default)(E,y.once)},y.throttleDelay)),y.disableMutationObserver||f.default.ready("[data-aos]",T),E)};L.exports={init:b,refresh:F,refreshHard:T}},function(L,p){},,,,,function(L,p){(function(i){function a(t,b,r){function C(x){var D=d,G=k;return d=k=void 0,Y=x,S=t.apply(G,D)}function q(x){return Y=x,$=setTimeout(W,b),Z?C(x):S}function B(x){var D=x-I,G=x-Y,ae=b-D;return R?T(ae,N-G):ae}function H(x){var D=x-I,G=x-Y;return I===void 0||D>=b||D<0||R&&G>=N}function W(){var x=s();return H(x)?X(x):void($=setTimeout(W,B(x)))}function X(x){return $=void 0,j&&d?C(x):(d=k=void 0,S)}function te(){$!==void 0&&clearTimeout($),Y=0,d=I=k=$=void 0}function o(){return $===void 0?S:X(s())}function l(){var x=s(),D=H(x);if(d=arguments,k=this,I=x,D){if($===void 0)return q(I);if(R)return $=setTimeout(W,b),C(I)}return $===void 0&&($=setTimeout(W,b)),S}var d,k,N,S,$,I,Y=0,Z=!1,R=!1,j=!0;if(typeof t!="function")throw new TypeError(g);return b=h(b)||0,w(r)&&(Z=!!r.leading,R="maxWait"in r,N=R?F(h(r.maxWait)||0,b):N,j="trailing"in r?!!r.trailing:j),l.cancel=te,l.flush=o,l}function m(t,b,r){var C=!0,q=!0;if(typeof t!="function")throw new TypeError(g);return w(r)&&(C="leading"in r?!!r.leading:C,q="trailing"in r?!!r.trailing:q),a(t,b,{leading:C,maxWait:b,trailing:q})}function w(t){var b=typeof t>"u"?"undefined":c(t);return!!t&&(b=="object"||b=="function")}function O(t){return!!t&&(typeof t>"u"?"undefined":c(t))=="object"}function n(t){return(typeof t>"u"?"undefined":c(t))=="symbol"||O(t)&&y.call(t)==v}function h(t){if(typeof t=="number")return t;if(n(t))return f;if(w(t)){var b=typeof t.valueOf=="function"?t.valueOf():t;t=w(b)?b+"":b}if(typeof t!="string")return t===0?t:+t;t=t.replace(z,"");var r=K.test(t);return r||J.test(t)?M(t.slice(2),r?2:8):_.test(t)?f:+t}var c=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g="Expected a function",f=NaN,v="[object Symbol]",z=/^\s+|\s+$/g,_=/^[-+]0x[0-9a-f]+$/i,K=/^0b[01]+$/i,J=/^0o[0-7]+$/i,M=parseInt,Q=(typeof i>"u"?"undefined":c(i))=="object"&&i&&i.Object===Object&&i,V=(typeof self>"u"?"undefined":c(self))=="object"&&self&&self.Object===Object&&self,E=Q||V||Function("return this")(),A=Object.prototype,y=A.toString,F=Math.max,T=Math.min,s=function(){return E.Date.now()};L.exports=m}).call(p,function(){return this}())},function(L,p){(function(i){function a(s,t,b){function r(j){var x=l,D=d;return l=d=void 0,I=j,N=s.apply(D,x)}function C(j){return I=j,S=setTimeout(H,t),Y?r(j):N}function q(j){var x=j-$,D=j-I,G=t-x;return Z?F(G,k-D):G}function B(j){var x=j-$,D=j-I;return $===void 0||x>=t||x<0||Z&&D>=k}function H(){var j=T();return B(j)?W(j):void(S=setTimeout(H,q(j)))}function W(j){return S=void 0,R&&l?r(j):(l=d=void 0,N)}function X(){S!==void 0&&clearTimeout(S),I=0,l=$=d=S=void 0}function te(){return S===void 0?N:W(T())}function o(){var j=T(),x=B(j);if(l=arguments,d=this,$=j,x){if(S===void 0)return C($);if(Z)return S=setTimeout(H,t),r($)}return S===void 0&&(S=setTimeout(H,t)),N}var l,d,k,N,S,$,I=0,Y=!1,Z=!1,R=!0;if(typeof s!="function")throw new TypeError(c);return t=n(t)||0,m(b)&&(Y=!!b.leading,Z="maxWait"in b,k=Z?y(n(b.maxWait)||0,t):k,R="trailing"in b?!!b.trailing:R),o.cancel=X,o.flush=te,o}function m(s){var t=typeof s>"u"?"undefined":h(s);return!!s&&(t=="object"||t=="function")}function w(s){return!!s&&(typeof s>"u"?"undefined":h(s))=="object"}function O(s){return(typeof s>"u"?"undefined":h(s))=="symbol"||w(s)&&A.call(s)==f}function n(s){if(typeof s=="number")return s;if(O(s))return g;if(m(s)){var t=typeof s.valueOf=="function"?s.valueOf():s;s=m(t)?t+"":t}if(typeof s!="string")return s===0?s:+s;s=s.replace(v,"");var b=_.test(s);return b||K.test(s)?J(s.slice(2),b?2:8):z.test(s)?g:+s}var h=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},c="Expected a function",g=NaN,f="[object Symbol]",v=/^\s+|\s+$/g,z=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,K=/^0o[0-7]+$/i,J=parseInt,M=(typeof i>"u"?"undefined":h(i))=="object"&&i&&i.Object===Object&&i,Q=(typeof self>"u"?"undefined":h(self))=="object"&&self&&self.Object===Object&&self,V=M||Q||Function("return this")(),E=Object.prototype,A=E.toString,y=Math.max,F=Math.min,T=function(){return V.Date.now()};L.exports=a}).call(p,function(){return this}())},function(L,p){function i(h){var c=void 0,g=void 0;for(c=0;c<h.length;c+=1)if(g=h[c],g.dataset&&g.dataset.aos||g.children&&i(g.children))return!0;return!1}function a(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function m(){return!!a()}function w(h,c){var g=window.document,f=a(),v=new f(O);n=c,v.observe(g.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function O(h){h&&h.forEach(function(c){var g=Array.prototype.slice.call(c.addedNodes),f=Array.prototype.slice.call(c.removedNodes),v=g.concat(f);if(i(v))return n()})}Object.defineProperty(p,"__esModule",{value:!0});var n=function(){};p.default={isSupported:m,ready:w}},function(L,p){function i(g,f){if(!(g instanceof f))throw new TypeError("Cannot call a class as a function")}function a(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(p,"__esModule",{value:!0});var m=function(){function g(f,v){for(var z=0;z<v.length;z++){var _=v[z];_.enumerable=_.enumerable||!1,_.configurable=!0,"value"in _&&(_.writable=!0),Object.defineProperty(f,_.key,_)}}return function(f,v,z){return v&&g(f.prototype,v),z&&g(f,z),f}}(),w=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,O=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,n=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,h=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,c=function(){function g(){i(this,g)}return m(g,[{key:"phone",value:function(){var f=a();return!(!w.test(f)&&!O.test(f.substr(0,4)))}},{key:"mobile",value:function(){var f=a();return!(!n.test(f)&&!h.test(f.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),g}();p.default=new c},function(L,p){Object.defineProperty(p,"__esModule",{value:!0});var i=function(m,w,O){var n=m.node.getAttribute("data-aos-once");w>m.position?m.node.classList.add("aos-animate"):typeof n<"u"&&(n==="false"||!O&&n!=="true")&&m.node.classList.remove("aos-animate")},a=function(m,w){var O=window.pageYOffset,n=window.innerHeight;m.forEach(function(h,c){i(h,n+O,w)})};p.default=a},function(L,p,i){function a(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(p,"__esModule",{value:!0});var m=i(12),w=a(m),O=function(n,h){return n.forEach(function(c,g){c.node.classList.add("aos-init"),c.position=(0,w.default)(c.node,h.offset)}),n};p.default=O},function(L,p,i){function a(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(p,"__esModule",{value:!0});var m=i(13),w=a(m),O=function(n,h){var c=0,g=0,f=window.innerHeight,v={offset:n.getAttribute("data-aos-offset"),anchor:n.getAttribute("data-aos-anchor"),anchorPlacement:n.getAttribute("data-aos-anchor-placement")};switch(v.offset&&!isNaN(v.offset)&&(g=parseInt(v.offset)),v.anchor&&document.querySelectorAll(v.anchor)&&(n=document.querySelectorAll(v.anchor)[0]),c=(0,w.default)(n).top,v.anchorPlacement){case"top-bottom":break;case"center-bottom":c+=n.offsetHeight/2;break;case"bottom-bottom":c+=n.offsetHeight;break;case"top-center":c+=f/2;break;case"bottom-center":c+=f/2+n.offsetHeight;break;case"center-center":c+=f/2+n.offsetHeight/2;break;case"top-top":c+=f;break;case"bottom-top":c+=n.offsetHeight+f;break;case"center-top":c+=n.offsetHeight/2+f}return v.anchorPlacement||v.offset||isNaN(h)||(g=h),c+g};p.default=O},function(L,p){Object.defineProperty(p,"__esModule",{value:!0});var i=function(a){for(var m=0,w=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)m+=a.offsetLeft-(a.tagName!="BODY"?a.scrollLeft:0),w+=a.offsetTop-(a.tagName!="BODY"?a.scrollTop:0),a=a.offsetParent;return{top:w,left:m}};p.default=i},function(L,p){Object.defineProperty(p,"__esModule",{value:!0});var i=function(a){return a=a||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(a,function(m){return{node:m}})};p.default=i}])})})(ne);var be=ne.exports;const he=le(be);function _e(){const{isDarkMode:u}=ce(),[ee,L]=P.useState([]),[p,i]=P.useState(!1),[a,m]=P.useState(!1),[w,O]=P.useState(!1),[n,h]=P.useState([]),[c,g]=P.useState(""),[f,v]=P.useState(null),[z,_]=P.useState({}),[K,J]=P.useState(!1),{register:M,handleSubmit:Q,watch:V,setValue:E,formState:{errors:A},reset:y}=me(),F=()=>{J(!K)},T=V("length"),s=V("physique");P.useEffect(()=>{if(T&&s){let o=0;const l=Math.pow(T,3);s==="Slim"?o=1.5*l/100:s==="Normal"?o=1.7*l/100:s==="Corpulent"&&(o=2*l/100),E("weight",o.toFixed(2))}},[T,s,E]),P.useEffect(()=>{he.init({duration:500,offset:500})},[]);const t=o=>{const l=o.target.files[0];if(l){const d=new FileReader;d.onloadend=()=>{g(d.result)},d.readAsDataURL(l),v(l)}},b=()=>{i(!p),y()},r=async o=>{console.log("onSubmit:",o),m(!0),O(!0);try{const l=localStorage.getItem("token");if(!l)throw new Error("No token found");const d=new FormData;d.append("name",o.name),d.append("physique",o.physique),d.append("age",o.age),d.append("length",o.length),d.append("weight",o.weight),d.append("gender",o.gender),d.append("variety",o.variety),d.append("pondDate",o.pondDate),d.append("breeder",o.breeder),d.append("price",o.price),d.append("koiPondId",o.pondId),f&&d.append("file",f),console.log(o),await se.post("https://koicaresystemv2.azurewebsites.net/api/koifishs/create",d,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"multipart/form-data"}}),i(!1),q(),re.success("Create Koi Successfully!")}catch(l){console.log(l),re.error("Create Koi Fail!")}finally{O(!1),m(!1)}},C=async()=>{try{const o=localStorage.getItem("token"),l=localStorage.getItem("id");if(!o)throw new Error("No token found");const d=await se.get(`https://koicaresystemv2.azurewebsites.net/api/koiponds/user/${l}/koiponds`,{headers:{Authorization:`Bearer ${o}`}});h(d.data.data)}catch(o){console.error("Error fetching ponds:",o)}},q=async()=>{m(!0);try{const o=localStorage.getItem("token"),l=localStorage.getItem("id");if(!o)throw new Error("No token found");const k=(await se.get(`https://koicaresystemv2.azurewebsites.net/api/koifishs/user/${l}/allKoi`,{headers:{Authorization:`Bearer ${o}`}})).data.data.sort((S,$)=>S.id-$.id),N=k.length;_(S=>({...S,[l]:N})),L(k)}catch(o){console.error("Error fetching koi:",o)}finally{m(!1)}};P.useEffect(()=>{q()},[]),P.useEffect(()=>{C()},[]);const B=(o,l)=>{let d=[...ee];console.log(d),l==="name"?d.sort((k,N)=>o==="asc"?k.name.localeCompare(N.name):N.name.localeCompare(k.name)):l==="age"?d.sort((k,N)=>o==="asc"?k.age-N.age:N.age-k.age):l==="length"&&d.sort((k,N)=>o==="asc"?k.length-N.length:N.length-k.length),L(d)},H=o=>{B(o,"age")},W=o=>{B(o,"length")},X=o=>{B(o,"name")},te=o=>ee.some(l=>l.name.toLowerCase()===o.toLowerCase());return e.jsxs("div",{children:[e.jsxs("div",{className:"h-screen flex",children:[e.jsx(pe,{}),e.jsxs("div",{className:`relative ${u?"bg-custom-light text-white":"bg-white text-black"} 
           shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`,children:[e.jsx(ge,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px]",children:[e.jsxs("div",{className:"",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"fixed lg:bottom-7 bottom-[22px] right-5 text-lg hover:bg-blue-600 text-white rounded-full shadow-lg lg:size-12 size-8 cursor-pointer z-30",onClick:b,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),e.jsx("div",{className:"fixed lg:w-[140px] w-[100px] lg:h-12 h-9 lg:bottom-7 bottom-5 right-5 rounded-3xl text-white bg-custom-left-bar z-20",children:e.jsxs("p",{className:"lg:text-3xl text-xl font-semibold pt-1 pl-3",children:[z[localStorage.getItem("id")]!==void 0?z[localStorage.getItem("id")]:"..."," ","Koi"]})})]}),e.jsx(fe,{text:"My Koi",links:"member/myKoi"}),e.jsxs("div",{children:[e.jsx("div",{className:"w-full flex justify-end relative",children:e.jsxs("div",{className:"cursor-pointer",onClick:F,children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:`${u?" text-custom-layout-light":"text-custom-layout-dark"} size-6 lg:size-8 mb-4`,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"})}),e.jsx("div",{className:`absolute right-0 transition-all duration-500 -mt-3 border z-10 ease-in-out overflow-hidden ${K?"max-h-50 opacity-100":"max-h-0 opacity-0"}`,children:e.jsxs("div",{className:`${u?"bg-custom-dark text-white":"bg-white text-black"} flex flex-col space-y-2 shadow-lg rounded-lg p-4`,children:[e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>X("desc"),children:"Sorted by Name (Z-A)"}),e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>X("asc"),children:"Sorted by Name (A-Z)"}),e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>W("asc"),children:"Sorted by Length (asc)"}),e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>W("desc"),children:"Sorted by Length (desc)"}),e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>H("asc"),children:"Sorted by Age (asc)"}),e.jsx("button",{className:`${u?"hover:bg-custom-layout-dark":"hover:bg-custom-layout-light"} btn py-2 px-4 rounded lg:text-xl text-xs `,onClick:()=>H("desc"),children:"Sorted by Age (desc)"})]})})]})}),ee.length>0?e.jsx(oe.div,{initial:"hidden",animate:"visible",variants:{visible:{transition:{staggerChildren:.01}}},className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 py-3",children:ee.map((o,l)=>e.jsx(oe.div,{variants:{hidden:{opacity:0,x:100},visible:{opacity:1,x:0,transition:{delay:l*.05}}},className:`${u?"bg-custom-dark text-white":"bg-white text-black"}  rounded-xl border cursor-pointer`,children:e.jsx(de,{onMouseEnter:()=>ue(()=>import("./KoiDetail-Csj2QSsY.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])),to:`/member/myKoi/${o.id}`,children:e.jsxs("div",{className:"flex gap-3 ",children:[e.jsx("div",{className:"w-[48%] ",children:e.jsx("img",{src:o.imageUrl,alt:o.name,className:"w-full h-32 object-cover rounded-s-xl overflow-hidden",style:{objectFit:"cover",filter:"brightness(1.1)"}})}),e.jsxs("div",{className:" w-[52%] flex mt-1  ",children:[e.jsxs("div",{className:"grid grid-rows-4 w-[30%]",children:[e.jsx("h3",{className:"text-sm ",children:"Name:"}),e.jsx("h3",{className:"text-sm ",children:"Age: "}),e.jsx("h3",{className:"text-sm ",children:"Variety:"}),e.jsx("h3",{className:"text-sm ",children:"Length:"})]}),e.jsxs("div",{className:"grid grid-rows-4",children:[e.jsx("p",{className:"ml-2 text-sm font-semibold text-nowrap z-50",children:o.name}),e.jsxs("p",{className:"ml-2 text-sm font-semibold ",children:[o.age," years"]}),e.jsx("p",{className:"ml-2 text-sm font-semibold ",children:o.variety}),e.jsxs("p",{className:"ml-2 text-sm font-semibold ",children:[o.length," cm"]})]})]})]})})},o.id))}):e.jsx(oe.div,{initial:"hidden",animate:"visible",variants:{visible:{transition:{staggerChildren:.01}}},className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 py-3",children:[...Array(12)].map((o,l)=>e.jsx(oe.div,{variants:{hidden:{opacity:0,x:100},visible:{opacity:1,x:0,transition:{delay:l*.05}}},className:`${u?"bg-custom-dark text-white":"bg-white text-black"} rounded-xl border cursor-pointer`,children:e.jsxs("div",{className:"flex gap-3",children:[e.jsx("div",{className:"w-[48%]",children:e.jsx(U,{height:128,className:"w-full h-32 rounded-s-xl"})}),e.jsxs("div",{className:"w-[52%] flex mt-1",children:[e.jsxs("div",{className:"grid grid-rows-4 w-[30%]",children:[e.jsx(U,{className:"text-sm"}),e.jsx(U,{className:"text-sm"}),e.jsx(U,{className:"text-sm"}),e.jsx(U,{className:"text-sm"})]}),e.jsxs("div",{className:"grid grid-rows-4",children:[e.jsx(U,{width:100,height:16,className:"ml-2"}),e.jsx(U,{width:80,height:16,className:"ml-2"}),e.jsx(U,{width:100,height:16,className:"ml-2"}),e.jsx(U,{width:80,height:16,className:"ml-2"})]})]})]})},l))})]})]})]})]}),p&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 ",children:e.jsx("div",{className:` ${u?"bg-custom-dark":"bg-white"}  lg:min-w-[80vh] m-auto p-6 rounded-lg shadow-lg`,children:e.jsxs("form",{onSubmit:Q(r),noValidate:!0,children:[e.jsxs("div",{className:"flex justify-between mb-5",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",onClick:()=>{y(),g(null),b()},className:"size-10 text-red-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),e.jsx("button",{type:"submit",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-10 text-green-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})})})]}),e.jsx("h3",{className:"mb-5 lg:text-2xl text-xl font-bold",children:"Add a Koi"}),e.jsxs("div",{className:"grid grid-cols-2 grid-rows-4 gap-4",children:[e.jsx("div",{id:"file",className:"lg:mb-6 col-span-1 row-span-2 h-full flex justify-center border border-black",children:c?e.jsxs("div",{className:"pre-upload max-w-[40vw] relative max-h-[154px] w-full h-full",children:[e.jsx("img",{src:c,alt:"Preview",className:"absolute w-full h-full object-cover"}),e.jsx("input",{type:"file",id:"upload-input",className:"absolute top-10 h-20 opacity-0",accept:"image/*",...M("file"),onChange:t}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-5 absolute text-white cursor-pointer -top-2 -right-2 rounded-full bg-red-500",onClick:()=>g(null),children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 12h14"})})]}):e.jsxs("label",{className:"pre-upload flex flex-col items-center justify-center text-center cursor-pointer",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",className:"mx-auto text-gray-500 inline-block w-10 h-10",viewBox:"0 0 16 16",children:[e.jsx("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),e.jsx("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})]}),e.jsx("div",{className:"py-3",children:e.jsx("span",{children:"Choose images here"})})]}),e.jsx("input",{type:"file",id:"upload-input",className:"absolute ml-20 opacity-0",accept:"image/*",...M("file"),onChange:t})]})}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{htmlFor:"name",className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,children:"Name"}),e.jsx("input",{type:"text",id:"name",placeholder:"Enter Name",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("name",{required:"Name is required",maxLength:{value:20,message:"Name must be at most 50 characters long"},validate:o=>!te(o)||"Name already exists"})}),A.name&&e.jsx("p",{className:"absolute -bottom-[3px] left-3 lg:-bottom-[22px] lg:left-3 text-red-500 text-sm",children:A.name.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{htmlFor:"physique",className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,children:"Physique"}),e.jsxs("select",{id:"physique",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("physique"),children:[e.jsx("option",{value:"Normal",children:"Normal"}),e.jsx("option",{value:"Slim",children:"Slim"}),e.jsx("option",{value:"Corpulent",children:"Corpulent"})]})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{htmlFor:"age",className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,children:"Age"}),e.jsx("div",{className:"h-10",children:e.jsxs("select",{id:"age",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...M("age"),children:[e.jsx("option",{value:0,children:"0 years"}),e.jsx("option",{value:1,children:"Tosai (1 year)"}),e.jsx("option",{value:2,children:"Nisai (2 years)"}),e.jsx("option",{value:3,children:"Sansai (3 years)"}),e.jsx("option",{value:4,children:"Yonsai (4 years)"}),e.jsx("option",{value:5,children:"Gosai (5 years)"}),e.jsx("option",{value:6,children:"Rokusai (6 years)"}),e.jsx("option",{value:7,children:"Nanasai (7 years)"}),[...Array(95)].map((o,l)=>e.jsxs("option",{value:l+6,children:[l+6," years"]},l+6))]})})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"length",children:"Length"}),e.jsx("input",{type:"number",id:"length",placeholder:"cm",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("length",{required:"Length is required",min:{value:1,message:"Length must greater than 0 cm"},max:{value:150,message:"Length must not exceed 150 cm"}})}),A.length&&e.jsx("p",{className:"absolute -bottom-[8px] left-3 lg:-bottom-[20px] lg:left-3 text-red-500 text-sm",children:A.length.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"weight",children:"Weight"}),e.jsx("input",{type:"number",id:"weight",placeholder:"g",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("weight",{required:"Weight is required",min:{value:1e-10,message:"Weigth must greater than 0 g"},max:{value:6e4,message:"Weigth must not exceed 60000 g"}})}),A.weight&&e.jsx("p",{className:"absolute -bottom-[8px] lg:-bottom-[20px] lg:left-3 left-3 text-red-500 text-sm",children:A.weight.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"gender",children:"Gender"}),e.jsxs("select",{id:"gender",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("gender"),children:[e.jsx("option",{value:"Undefined",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"}),e.jsx("option",{value:"Undefined",children:"Undefined"})]})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"variety",children:"Variety"}),e.jsx("input",{type:"text",id:"variety",placeholder:"Enter Variety",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("variety",{required:!1})})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"pondDate",children:"In Pond Date"}),e.jsx("input",{type:"date",id:"pondDate",max:new Date().toISOString().split("T")[0],defaultValue:new Date().toISOString().split("T")[0],className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...M("pondDate")})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"breeder",children:"Breeder"}),e.jsx("input",{type:"text",id:"breeder",placeholder:"Enter Breeder",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("breeder",{required:!1})})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"price",children:"Price"}),e.jsx("input",{type:"number",id:"price",placeholder:"VND",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("price",{required:"Price is required",min:{value:1,message:"Price must be greater than 0"}})}),A.price&&e.jsx("p",{className:"absolute -bottom-4 left-4 lg:-bottom-6 lg:left-4 text-red-500 text-sm",children:A.price.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4 mt-2",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"pondId",children:"Pond"}),e.jsx("select",{id:"pondId",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,...M("pondId",{required:"Please select a pond"}),children:n.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))}),A.pondId&&e.jsx("p",{className:"absolute -bottom-[14px] left-3 text-red-500 text-sm",children:A.pondId.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mb-4 mt-2",children:[e.jsx("label",{className:`absolute block -top-[12px] ${u?"bg-custom-dark":"bg-white"} left-3 lg:text-lg text-sm text-red-500 font-semibold`,htmlFor:"price",children:"Status"}),e.jsx("input",{type:"text",id:"status",value:"Alive",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${u?"bg-custom-dark":"bg-white"} border border-black  rounded-lg focus:outline-none transition-colors duration-200`,readOnly:!0})]})]})]})})})]})}export{_e as default};
