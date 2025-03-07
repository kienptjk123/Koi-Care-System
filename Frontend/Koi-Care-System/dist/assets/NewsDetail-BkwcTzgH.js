import{r as d,e as v,d as k,u as b,j as e,a,B as g}from"./index-D0YIHR4A.js";import{L as N,H as y}from"./LeftSideBar-C-k9Lfu9.js";import{Q as L}from"./QuillContentRender-BMWB9YCk.js";import{T as z}from"./TopLayout-DETw-guT.js";import"./index-iH4zfJEX.js";import"./index-BMdVHJVA.js";import"./index-eUZTU6MH.js";import"./index-aIHYwc5K.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Typography-CvIXc89m.js";function V(){var h,u;const[s,f]=d.useState([]),[i,p]=d.useState(null),{id:w}=v(),{isDarkMode:n}=k(),x=b(),j=async()=>{var o,l;try{const r=localStorage.getItem("token");if(!r)throw new Error("No token found");const t=await a.get(`https://koicaresystemv2.azurewebsites.net/api/blog/getID/${w}`,{headers:{Authorization:`Bearer ${r}`}});f(t.data.data);const c=t.data.data.user.id;m(c)}catch(r){a.isAxiosError(r)?((o=r.response)==null?void 0:o.status)===401?(console.error("Unauthorized access - Token expired or invalid. Logging out..."),localStorage.removeItem("token"),localStorage.removeItem("id"),g.error("Token expired navigate to login"),x("/login")):console.error("Error fetching ponds:",(l=r.response)==null?void 0:l.status,r.message):console.error("An unexpected error occurred:",r)}},m=async o=>{var l,r;try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const c=await a.get(`https://koicaresystemv2.azurewebsites.net/api/profile/${o}`,{headers:{Authorization:`Bearer ${t}`}});p(c.data.data)}catch(t){a.isAxiosError(t)?((l=t.response)==null?void 0:l.status)===401?(console.error("Unauthorized access - Token expired or invalid. Logging out..."),localStorage.removeItem("token"),localStorage.removeItem("id"),g.error("Token expired navigate to login"),x("/login")):console.error("Error fetching profile:",(r=t.response)==null?void 0:r.status,t.message):console.error("An unexpected error occurred:",t)}};return d.useEffect(()=>{j(),m()},[]),e.jsxs("div",{className:"h-screen flex",children:[e.jsx(N,{}),e.jsxs("div",{className:`relative ${n?"bg-custom-light text-white":"bg-white text-black"} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden duration-200 ease-linear`,children:[e.jsx(y,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px]",children:[e.jsx(z,{text:"News",textName:"News Detail",links:"member/news"}),e.jsxs("div",{className:" flex flex-col justify-center items-center border border-gray-200",children:[e.jsx("div",{className:`${n?"bg-custom-dark text-white":"bg-white text-black"} shadow-sm rounded-lg w-full`,children:e.jsx("img",{src:s.blogImage,alt:"blog",className:"lg:h-[70vh] h-[50vh] w-full object-cover rounded-lg",style:{objectFit:"cover",filter:"brightness(1.1) contrast(1.1)"}})}),e.jsx("div",{className:"flex gap-2 justify-start w-full mt-10 mb-10 px-6",children:(h=s.tags)==null?void 0:h.map(o=>e.jsx("span",{className:`lg:text-lg text-sm  px-2 py-1 rounded-xl ${n?"bg-custom-layout-dark":"bg-custom-layout-light"} `,children:o.tagName},o.tagId))}),e.jsx("h1",{className:"lg:text-3xl text-xl font-semibold text-justify flex justify-start px-6",children:s.blogTitle}),e.jsx("div",{className:"flex items-center mt-5",children:e.jsx("div",{children:e.jsxs("p",{className:"lg:text-xl text-sm",children:[" ",s.blogDate]})})}),e.jsxs("div",{className:"w-full mt-5 ",children:[e.jsxs("div",{className:"py-5 flex w-full justify-between border-b border-gray-300 px-6",children:[e.jsx("a",{className:"cursor-pointer flex items-center justify-center p-2 bg-slate-100 flex-none text-black w-10 h-10 rounded-full",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-4",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"})})}),e.jsxs("div",{className:"flex gap-2 ",children:[e.jsx("a",{className:"cursor-pointer flex items-center justify-center p-2 bg-slate-100 text-black flex-none text-blue w-10 h-10 rounded-full",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-4",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"})})}),e.jsx("a",{className:"cursor-pointer flex items-center justify-center p-2 bg-blue-500 flex-none text-white w-10 h-10 rounded-full",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-4",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"})})})]})]}),e.jsx("div",{className:"p-6 border-none",children:e.jsx(L,{content:s.blogContent})}),e.jsxs("div",{className:"flex border-b py-4 border-gray-300 items-center gap-2 px-6",children:[e.jsx("img",{src:(i==null?void 0:i.avatar)||"default-avatar.png",alt:"Author Avatar",className:"w-10 h-10 rounded-full border border-gray-300"}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"flex items-end",children:e.jsx("p",{children:(u=s==null?void 0:s.user)==null?void 0:u.username})}),e.jsxs("div",{className:"lg:flex items-center mt-5 sm:ml-auto sm:mt-0 hidden",children:["Share this post:",e.jsx("a",{className:"cursor-pointer flex items-center justify-center w-8 h-8 ml-2 border rounded-full sm:w-10 sm:h-10 dark:border-darkmode-400 text-slate-400 zoom-in",href:!0,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-facebook-icon stroke-1.5 w-3 h-3 fill-current ",children:e.jsx("path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"})})}),e.jsx("a",{className:"cursor-pointer flex items-center justify-center w-8 h-8 ml-2 border rounded-full sm:w-10 sm:h-10 dark:border-darkmode-400 text-slate-400 zoom-in",href:!0,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-twitter-icon stroke-1.5 w-3 h-3 fill-current ",children:e.jsx("path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"})})}),e.jsx("a",{className:"cursor-pointer flex items-center justify-center w-8 h-8 ml-2 border rounded-full sm:w-10 sm:h-10 dark:border-darkmode-400 text-slate-400 zoom-in",href:!0,children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-linkedin-icon stroke-1.5 w-3 h-3 fill-current ",children:[e.jsx("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),e.jsx("rect",{width:4,height:12,x:2,y:9}),e.jsx("circle",{cx:4,cy:4,r:2})]})})]})]})})]})]})]})]})]})]})}export{V as default};
