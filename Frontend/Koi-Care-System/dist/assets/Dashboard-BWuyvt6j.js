import{d as V,r as a,j as e,a as c}from"./index-DsR5MBtH.js";import{L as G,H as U,G as q,a as H}from"./LeftSideBar-C-BsqDrC.js";import{I as W}from"./index-Ct2qSsmL.js";import{I as X}from"./index-DSRF4rO0.js";import{M as Y}from"./index-B5ip7E7x.js";import{T as Q}from"./TopLayout-DMU84uD5.js";import{R as J,B as Z,C as _,X as ee,Y as te,T as se,L as re,a as u}from"./BarChart-CiRbiy6m.js";import"./index-BKN4LrXa.js";import"./index-gO7psG0g.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Typography-BGxL3EC8.js";import"./isEqual-Bky0V7bD.js";function je(){const{isDarkMode:o}=V(),[f,w]=a.useState([]),[n,k]=a.useState([]),[d,v]=a.useState([]),[x,I]=a.useState([]),[S,$]=a.useState([]),[i,z]=a.useState([]),[m,E]=a.useState([]),[g,P]=a.useState([]),[ae,j]=a.useState(null),D=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("id"),l=(await c.get(`https://koicaresystemv2.azurewebsites.net/api/payment/user/${s}`,{headers:{Authorization:`Bearer ${t}`}})).data.data.slice(-5);z(l),console.log(l)}catch(t){console.error("Error fetching payments:",t)}};a.useEffect(()=>{D()},[]);const A=async()=>{const t=localStorage.getItem("token");try{const s=await c.get("https://koicaresystemv2.azurewebsites.net/api/reminders/list/user",{headers:{Authorization:`Bearer ${t}`}});E(s.data.data)}catch(s){console.log(s)}};a.useEffect(()=>{A()},[]);function B(){const t=new Date,s=[];for(let r=-3;r<=3;r++){const l=new Date(t);l.setDate(t.getDate()+r);const h=l.toISOString().slice(0,10);s.push(h)}return s}const C=async()=>{var t,s,r;try{const l=localStorage.getItem("token"),h=localStorage.getItem("id"),M=B(),y=[];for(const N of M){const p=await c.get("https://koicaresystemv2.azurewebsites.net/api/reports/FishPondWater",{headers:{Authorization:`Bearer ${l}`},params:{userId:h,date:N}});y.push({date:N,koiFishs:(t=p.data.data.koiFishs)==null?void 0:t.length,koiPonds:(s=p.data.data.koiPonds)==null?void 0:s.length,waterParameters:(r=p.data.data.waterParameters)==null?void 0:r.length})}$(y)}catch(l){console.error("Error fetching water parameters:",l)}};a.useEffect(()=>{C()},[]);const b=async t=>{try{const s=localStorage.getItem("token");if(!s)throw new Error("No token found");const r=await c.get(`https://koicaresystemv2.azurewebsites.net/api/orders/${t}/order`,{headers:{Authorization:`Bearer ${s}`}});I(r.data.data.items),console.log(r.data.data.items)}catch(s){console.error("Error fetching water parameters:",s)}};a.useEffect(()=>{b()},[]);const R=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("id");if(!t)throw new Error("No token found");const r=await c.get(`https://koicaresystemv2.azurewebsites.net/api/orders/user/${s}/order`,{headers:{Authorization:`Bearer ${t}`}});P(r.data.data)}catch(t){console.error("Error fetching water parameters:",t)}};a.useEffect(()=>{R()},[]);const O=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("id");if(!t)throw new Error("No token found");const r=await c.get(`https://koicaresystemv2.azurewebsites.net/api/water-parameters/getByUserId/${s}`,{headers:{Authorization:`Bearer ${t}`}});v(r.data.data)}catch(t){console.error("Error fetching water parameters:",t)}};a.useEffect(()=>{O()},[]);const K=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("id");if(!t)throw new Error("No token found");const r=await c.get(`https://koicaresystemv2.azurewebsites.net/api/koifishs/user/${s}/allKoi`,{headers:{Authorization:`Bearer ${t}`}});k(r.data.data)}catch(t){console.error("Error fetching koi:",t)}};a.useEffect(()=>{K()},[]);const L=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("id");if(!t)throw new Error("No token found");const r=await c.get(`https://koicaresystemv2.azurewebsites.net/api/koiponds/user/${s}/koiponds`,{headers:{Authorization:`Bearer ${t}`}});w(r.data.data)}catch(t){console.log(t)}};a.useEffect(()=>{L()},[]);const T=i.map(t=>t.createDate.slice(0,10));a.useEffect(()=>{x.length===1&&j(f[0])},[x]);const F=t=>{const s=t.target.value;j(s),b(s)};return e.jsx("div",{children:e.jsxs("div",{className:"h-screen flex",children:[e.jsx(G,{}),e.jsxs("div",{className:`relative ${o?"bg-custom-dark text-white":"bg-white text-black"} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`,children:[e.jsx(U,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px] ",children:[e.jsx(Q,{text:"Dashboard",links:"member/dashboard"}),e.jsxs("div",{className:"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mt-10 px-2 gap-10",children:[e.jsxs("div",{className:"flex flex-col rounded-lg items-center py-8 justify-center bg-yellow-100",children:[e.jsx(q,{className:"size-20 p-5 rounded-full text-white bg-yellow-500"}),e.jsx("div",{className:`${o?"text-black":""} text-2xl mt-3`,children:"Ponds"}),e.jsx("div",{className:`text-2xl mt-1 ${o?"text-black":""}`,children:f.length})]}),e.jsxs("div",{className:"flex flex-col rounded-lg items-center py-8 justify-center bg-gray-100",children:[e.jsx(X,{className:"size-20 p-5 rounded-full bg-blue-400 text-white"}),e.jsx("div",{className:`${o?"text-black":""} text-2xl mt-3`,children:"Koi"}),e.jsx("div",{className:`text-2xl mt-1 ${o?"text-black":""}`,children:n==null?void 0:n.length})]}),e.jsxs("div",{className:"flex flex-col rounded-lg items-center py-8 justify-center bg-pink-100",children:[e.jsx(W,{className:"size-20 p-5 rounded-full bg-pink-500 text-white"}),e.jsx("div",{className:`${o?"text-black":""} text-2xl mt-3`,children:"Parameters"}),e.jsx("div",{className:`text-2xl mt-1 ${o?"text-black":""}`,children:d==null?void 0:d.length})]}),e.jsxs("div",{className:"flex flex-col rounded-lg items-center py-8 justify-center bg-orange-100",children:[e.jsx(H,{className:"size-20 p-5 rounded-full text-white bg-orange-500"}),e.jsx("div",{className:`${o?"text-black":""} text-2xl mt-3`,children:"Reminders"}),e.jsx("div",{className:`text-2xl mt-1 ${o?"text-black":""}`,children:m==null?void 0:m.length})]}),e.jsxs("div",{className:"flex flex-col rounded-lg border border-gray-200 bg-green-100 items-center py-8 justify-center",children:[e.jsx(Y,{className:"size-20 rounded-full text-white bg-green-500 p-5"}),e.jsx("div",{className:`${o?"text-black":""} text-2xl mt-3`,children:"Orders"}),e.jsx("div",{className:`text-2xl mt-1 ${o?"text-black":""}`,children:g==null?void 0:g.length})]})]}),e.jsxs("div",{className:"mt-10 py-5 px-2 border border-gray-200",children:[e.jsx("h3",{className:"text-center text-2xl mb-6",children:"Report Overview"}),e.jsx(J,{width:"100%",height:600,children:e.jsxs(Z,{data:S,margin:{top:20,right:30,left:20,bottom:5},children:[e.jsx(_,{strokeDasharray:"3 3"}),e.jsx(ee,{dataKey:"date"}),e.jsx(te,{}),e.jsx(se,{}),e.jsx(re,{}),e.jsx(u,{dataKey:"koiFishs",fill:"#8884d8"}),e.jsx(u,{dataKey:"koiPonds",fill:"#82ca9d"}),e.jsx(u,{dataKey:"waterParameters",fill:"#ffc658"})]})})]}),e.jsxs("div",{className:"mt-10 grid lg:grid-cols-7 grid-cols-1 gap-14",children:[e.jsxs("div",{className:"lg:col-span-3 border border-gray-200 px-6 py-6 max-h-[580px]",children:[e.jsx("div",{className:"lg:text-2xl text-lg font-semibold mb-3",children:"Recent Transaction"}),e.jsx("div",{className:"flex justify-center flex-col lg:px-10 px-5",children:i.map((t,s)=>e.jsxs("div",{className:"flex lg:gap-7 gap-3 mt-4",children:[e.jsx("div",{className:"flex lg:text-lg text-sm",children:T[s]}),e.jsxs("div",{className:"flex flex-col gap-3 items-center",children:[s===0&&e.jsx("span",{className:"size-6 border-4 border-blue-500 rounded-full"}),s===1&&e.jsx("span",{className:"size-6 border-4 border-purple-500 rounded-full"}),s===2&&e.jsx("span",{className:"size-6 border-4 border-red-500 rounded-full"}),s===3&&e.jsx("span",{className:"size-6 border-4 border-green-500 rounded-full"}),s===4&&e.jsx("span",{className:"size-6 border-4 border-purple-500 rounded-full"}),s!==i.slice(0,5).length-1&&e.jsx("span",{className:"w-0.5 h-12 bg-gray-300"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"lg:text-lg text-xs",children:["Transaction Code: ",t.invoiceCode]}),e.jsxs("div",{className:"lg:text-lg text-xs",children:["Amount:"," ",t==null?void 0:t.amount.toLocaleString("vi-VN",{style:"currency",currency:"VND"})]})]})]},t.orderId))})]}),e.jsxs("div",{className:"lg:col-span-4 border border-gray-200 px-5 py-6",children:[e.jsxs("div",{className:"flex flex-col items gap-4 lg:flex-row justify-between",children:[e.jsx("div",{className:"lg:text-2xl text-xl font-semibold",children:"Payment Details"}),e.jsxs("select",{className:`${o?"bg-custom-dark":"bg-white"} lg:text-xl text-base border lg:p-3 px-3 py-2 border-gray-200 rounded-lg`,onChange:F,children:[e.jsx("option",{value:"",children:"Transaction Code"}),i.map(t=>e.jsx("option",{value:t.orderId,children:t.transactionCode},t.orderId))]})]}),e.jsx("div",{className:"mt-10",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{className:"",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{scope:"col",className:"px-8 py-3 text-start text-gray-500 lg:text-xl text-basefont-bold uppercase tracking-wider",children:"Product"}),e.jsx("th",{scope:"col",className:"lg:inline-block hidden px-6 pr-5 text-start text-xl font-bold text-gray-500 uppercase tracking-wider",children:"Quantity"}),e.jsx("th",{scope:"col",className:"lg:inline-block hidden px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase tracking-wider",children:"Price"})]})}),e.jsx("tbody",{className:`${o?"bg-custom-dark":"bg-white"} divide-y divide-gray-200`,children:x.map(t=>e.jsxs("tr",{className:"",children:[e.jsxs("td",{className:"px-6 py-4 text-center whitespace-nowrap flex gap-5",children:[e.jsx("div",{className:"",children:e.jsx("img",{src:t.imageUrl,alt:"",className:"mx-auto lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] rounded-lg border border-gray-200"})}),e.jsxs("div",{className:"flex flex-col lg:m-0 justify-start items-start",children:[e.jsx("div",{className:"text-start sm:text-wrap font-semibold lg:text-xl text-base sm:w-40 lg:border-none border-r border-gray-200",children:t.productName}),e.jsx("div",{className:"mt-2 lg:text-xl text-xs",children:t.category})]})]}),e.jsx("td",{className:"px-6 py-4 text-center whitespace-nowrap",children:e.jsx("div",{className:"lg:flex hidden gap-5 w-16",children:e.jsx("div",{className:"text-xl",children:t.quantity})})}),e.jsx("td",{className:"px-6 py-4 lg:flex hidden text-xl whitespace-nowrap",children:t.price.toLocaleString("vi-VN",{style:"currency",currency:"VND"})})]},t.productId))})]})})]})]})]})]})]})})}export{je as default};
