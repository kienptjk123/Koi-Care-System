import{d as j,r as x,y as w,j as e,L as h,a as u,aW as N,a0 as v}from"./index-DsR5MBtH.js";import{L as b,H as k}from"./LeftSideBar-C-BsqDrC.js";import{T as L}from"./TopLayout-DMU84uD5.js";import"./index-BKN4LrXa.js";import"./index-gO7psG0g.js";import"./index-Ct2qSsmL.js";import"./index-DSRF4rO0.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Typography-BGxL3EC8.js";const B=()=>{const{isDarkMode:o}=j();x.useState(1);const[l,n]=x.useState([]),p=w(),i=l.reduce((t,s)=>t+s.totalPrice,0),d=l.reduce((t,s)=>t+s.promotionPrice,0),g=async t=>{const s=l.map(r=>r.product.id===t?{...r,quantity:r.quantity+1,totalPrice:(r.quantity+1)*r.product.price,promotionPrice:(r.quantity+1)*r.unitPrice}:r);n(s);try{const r=localStorage.getItem("token"),c=localStorage.getItem("cartId");if(!r)throw new Error("No token found");await u.put(`https://koicaresystemv2.azurewebsites.net/api/cartItems/cart/${c}/product/${t}/update`,{quantity:s.find(a=>a.product.id===t).quantity},{headers:{Authorization:`Bearer ${r}`}})}catch(r){console.log(r)}},f=async t=>{const s=l.map(r=>r.product.id===t&&r.quantity>1?{...r,quantity:r.quantity-1,totalPrice:(r.quantity-1)*r.product.price,promotionPrice:(r.quantity-1)*r.unitPrice}:r);n(s);try{const r=localStorage.getItem("token"),c=localStorage.getItem("cartId");if(!r)throw new Error("No token found");await u.put(`https://koicaresystemv2.azurewebsites.net/api/cartItems/cart/${c}/product/${t}/update`,{quantity:s.find(a=>a.product.id===t).quantity},{headers:{Authorization:`Bearer ${r}`}})}catch(r){console.log(r)}};localStorage.setItem("totalPrice",i),localStorage.setItem("promotionTotal",d);const m=async()=>{try{const t=localStorage.getItem("token"),s=localStorage.getItem("cartId");if(!t)throw new Error("No token found");const r=await u.get(`https://koicaresystemv2.azurewebsites.net/api/carts/cart/${s}/my-cart`,{headers:{Authorization:`Bearer ${t}`}}),c=r.data.data.items.map(a=>({...a,totalPrice:a.quantity*a.product.price,promotionPrice:a.quantity*a.unitPrice}));n(c),console.log(r.data.data)}catch(t){console.log(t)}};x.useEffect(()=>{m()},[]);const y=async t=>{await p(N(t)),p(v()),m()};return e.jsx("div",{children:e.jsxs("div",{className:"h-screen flex",children:[e.jsx(b,{}),e.jsxs("div",{className:`relative ${o?"bg-custom-dark text-white":"bg-white text-black"} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`,children:[e.jsx(k,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px] ",children:[e.jsx(L,{text:"Recommendations",textName:"Checkout",links:"member/recommendations"}),e.jsxs("div",{className:"lg:border lg:border-gray-200 lg:px-10 lg:py-5 rounded-xl",children:[e.jsxs("ol",{className:"items-center lg:flex hidden w-full px-52 pb-20 pt-14 justify-center text-center text-sm font-medium text-gray-700",children:[e.jsx("li",{className:"flex items-center after:mx-2 after:mb-10 after:h-1 after:w-full w-full after:border-b after:border-gray-400 dark:text-primary-500",children:e.jsxs("span",{className:"flex flex-col",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white ",children:"1"}),e.jsx("div",{className:"mt-4",children:"Cart"})]})}),e.jsx("li",{className:"flex items-center after:mx-2 after:mb-10 after:h-1 after:w-full w-full after:border-b after:border-gray-400 dark:text-primary-500",children:e.jsxs("span",{className:"flex flex-col",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white ",children:"2"}),e.jsx("div",{className:"mt-4",children:"Address"})]})}),e.jsx("li",{className:"flex items-center",children:e.jsxs("span",{className:"flex flex-col",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white ",children:"3"}),e.jsx("div",{className:"mt-4",children:"Payment"})]})})]}),e.jsx("div",{className:"relative overflow-x-auto",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{className:"",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{scope:"col",className:"px-8 py-3 text-start text-gray-500 lg:text-xl text-xs font-medium uppercase tracking-wider",children:"Product"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start lg:text-xl text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Quantity"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start lg:text-xl text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Price"})]})}),e.jsx("tbody",{className:`${o?"bg-custom-dark":"bg-white"} divide-y divide-gray-200`,children:l.map(t=>{var s,r;return e.jsxs("tr",{children:[e.jsxs("td",{className:"px-6 py-4 text-center whitespace-nowrap flex gap-5",children:[e.jsx("div",{className:"w-32",children:e.jsx("img",{src:(r=(s=t.product)==null?void 0:s.images[0])==null?void 0:r.downloadUrl,alt:"",className:"mx-auto lg:w-[120px] lg:h-[120px] w-[70px] h-[70px] rounded-lg border border-gray-200"})}),e.jsxs("div",{className:"flex flex-col justify-start items-start",children:[e.jsx("div",{className:"text-start font-semibold lg:text-xl text-base",children:t.product.name}),e.jsx("div",{className:"mt-2 lg:text-lg text-sm",children:t.product.category.name}),e.jsx("svg",{onClick:()=>y(t.product.id),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-5 text-red-500 mt-4 ml-2 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"})})]})]}),e.jsxs("td",{className:"px-6 py-4 text-center whitespace-nowrap",children:[" ",e.jsx("div",{className:"flex gap-5 items-center justify-start w-full",children:e.jsxs("div",{className:"flex border border-blue-400 gap-5 rounded-lg",children:[e.jsx("button",{className:"border-blue-400 border-r rounded-lg lg:p-2 p-1",onClick:()=>f(t.product.id),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"lg:size-8 size-6 text-blue-400",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 12h14"})})}),e.jsx("input",{type:"text",value:t.quantity,className:`outline-none lg:w-10 w-5 text-center text-xl text-blue-400 ${o?"bg-custom-dark":"bg-white"}`}),e.jsx("button",{className:"border-l border-blue-400 lg:p-2 p-1",onClick:()=>g(t.product.id),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"lg:size-8 size-6 text-blue-400",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]})})]}),e.jsx("td",{className:"px-6 py-4 text-start whitespace-nowrap",children:t.promotionPrice!==t.totalPrice?e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"line-through opacity-50",children:((t==null?void 0:t.totalPrice)??0).toLocaleString("vi-VN",{style:"currency",currency:"VND"})}),e.jsxs("div",{className:"",children:[" ",((t==null?void 0:t.promotionPrice)??0).toLocaleString("vi-VN",{style:"currency",currency:"VND"})]})]}):e.jsxs("div",{className:"",children:[" ",((t==null?void 0:t.totalPrice)??0).toLocaleString("vi-VN",{style:"currency",currency:"VND"})]})})]},t.itemId)})})]})}),e.jsxs("div",{className:"lg:border lg:border-gray-200 lg:px-10 lg:py-5 mt-10 rounded-xl",children:[e.jsx("div",{className:"text-xl lg:text-2xl font-semibold",children:"Order Summary"}),e.jsxs("div",{className:"flex mt-5 lg:mt-7 text-lg lg:text-xl justify-between",children:[e.jsx("div",{children:"Sub Total"}),e.jsx("div",{children:i.toLocaleString("vi-VN",{style:"currency",currency:"VND"})})]}),e.jsxs("div",{className:"flex mt-5 lg:mt-7 text-lg lg:text-xl justify-between",children:[e.jsx("div",{children:"Discount"}),e.jsx("div",{children:(i-d).toLocaleString("vi-VN",{style:"currency",currency:"VND"})})]}),e.jsxs("div",{className:"flex mt-5 lg:mt-7 text-lg lg:text-xl justify-between",children:[e.jsx("div",{children:"Shipping"}),e.jsx("div",{children:"Free"})]}),e.jsxs("div",{className:"flex  mt-5 lg:mt-7 text-lg lg:text-xl justify-between",children:[e.jsx("div",{className:"font-medium",children:"Total"}),e.jsx("div",{children:d.toLocaleString("vi-VN",{style:"currency",currency:"VND"})})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between mt-8",children:[e.jsx(h,{to:-1,className:"w-full lg:w-auto px-6 py-3 bg-gray-300 text-center hover:bg-gray-400 text-white rounded-lg cursor-pointer",children:"Back"}),e.jsx(h,{to:"/member/checkout",className:"w-full lg:w-auto px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-center cursor-pointer",children:"Checkout"})]})]})]})]})]})]})})};export{B as default};
