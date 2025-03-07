import{d as E,r as d,j as e,m as j,a as g,B as b}from"./index-D0YIHR4A.js";import{L as z,H as M}from"./LeftSideBar-C-k9Lfu9.js";import{T as C}from"./TopLayout-DETw-guT.js";import{a as D}from"./index.esm-BJdVWKmv.js";import{F as B}from"./index-BMdVHJVA.js";import{S as q}from"./sweetalert2.esm.all-D3pEHXw3.js";import"./index-iH4zfJEX.js";import"./index-eUZTU6MH.js";import"./index-aIHYwc5K.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Typography-CvIXc89m.js";function G(){const{isDarkMode:s}=E(),[v,w]=d.useState([]),[k,p]=d.useState(!1),[N,c]=d.useState(!1),[y,o]=d.useState(!1),{register:l,handleSubmit:f,formState:{errors:r},reset:h}=D(),I=t=>{localStorage.setItem("reminderId",t.id),h(t),c(!0)},L=()=>{c(!1),h({title:"",dateTime:"",description:"",repeatInterval:v.repeatInterval})},m=async()=>{const t=localStorage.getItem("token");try{const a=(await g.get("https://koicaresystemv2.azurewebsites.net/api/reminders/list/user",{headers:{Authorization:`Bearer ${t}`}})).data.data.map(x=>{let[n,u]=x.dateTime.split("T");return n=new Date(n).toISOString().split("T")[0],u=u?u.split(".")[0]:"",{...x,date:n,time:u}});a.sort((x,n)=>new Date(x.dateTime)-new Date(n.dateTime)),w(a),console.log(a)}catch(i){console.log(i)}};d.useEffect(()=>{m()},[]);const T=async t=>{o(!0);try{const i=localStorage.getItem("token");await g.post("https://koicaresystemv2.azurewebsites.net/api/reminders/create",{title:t.title,dateTime:t.dateTime,repeatInterval:t.repeatInterval,description:t.description},{headers:{Authorization:`Bearer ${i}`}}),console.log(t.dateTime),b.success("Create reminder success"),m(),p(!1),h()}catch(i){console.log(i)}finally{o(!1)}},S=async t=>{o(!0);try{const i=localStorage.getItem("token"),a=localStorage.getItem("reminderId");await g.put(`https://koicaresystemv2.azurewebsites.net/api/reminders/update/${a}`,{title:t.title,dateTime:t.dateTime,repeatInterval:t.repeatInterval,description:t.description},{headers:{Authorization:`Bearer ${i}`}}),m(),b.success("Update reminder success"),c(!1)}catch(i){console.log(i)}finally{o(!1)}},$=async()=>{o(!0);const{isConfirmed:t}=await q.fire({title:"Are you sure?",text:"You won’t be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"});if(!t){o(!1);return}try{const i=localStorage.getItem("token");i||console.log("not found token");const a=localStorage.getItem("reminderId");await g.delete(`https://koicaresystemv2.azurewebsites.net/api/reminders/delete/${a}`,{headers:{Authorization:`Bearer ${i}`}}),m(),b.success("Delete reminder success"),c(!1)}catch(i){console.log("err",i)}finally{o(!1)}};return e.jsx("div",{children:e.jsxs("div",{className:"h-screen flex",children:[e.jsx(z,{}),e.jsxs("div",{className:`relative ${s?"bg-custom-dark text-white":"bg-white text-black"} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`,children:[e.jsx(M,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px] max-h-[800px]",children:[e.jsx(C,{text:"Reminders",links:"/member/reminders"}),e.jsxs(j.div,{initial:"hidden",animate:"visible",variants:{visible:{transition:{staggerChildren:.3}}},className:"grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"fixed z-20 bottom-5 right-[40px] text-lg text-white outline-none rounded-full bg-custom-left-bar shadow-lg size-12 lg:size-16 lg:p-2 cursor-pointer",onClick:()=>{p(!0)},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),v.map((t,i)=>e.jsx(j.div,{variants:{hidden:{opacity:0,x:100},visible:{opacity:1,x:0,transition:{delay:i*.3}}},onClick:()=>I(t),className:"border border-gray-200 rounded-3xl shadow-xl px-8 py-6 flex justify-between items-center",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:"text-2xl",children:t.title}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-7",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"})}),e.jsx("div",{className:"text-xl font-semibold",children:t.date})]}),e.jsxs("div",{className:"flex gap-8 items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-7",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),e.jsx("div",{className:"text-xl font-semibold items-center",children:t.time})]}),e.jsxs("div",{className:"flex gap-5 items-center",children:[e.jsx("div",{className:"size-10",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"ionicon s-ion-icon",viewBox:"0 0 512 512",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M320 120l48 48-48 48",className:"ionicon-fill-none ionicon-stroke-width"}),e.jsx("path",{d:"M352 168H144a80.24 80.24 0 00-80 80v16M192 392l-48-48 48-48",strokeLinecap:"round",strokeLinejoin:"round",className:"ionicon-fill-none ionicon-stroke-width"}),e.jsx("path",{d:"M160 344h208a80.24 80.24 0 0080-80v-16",strokeLinecap:"round",strokeLinejoin:"round",className:"ionicon-fill-none ionicon-stroke-width"})]})}),e.jsx("div",{className:"text-xl font-semibold",children:t.repeatInterval})]})]})},t.id))]}),k&&e.jsx("form",{onSubmit:f(T),className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40",children:e.jsxs("div",{className:` ${s?"bg-custom-dark":"bg-white"}  lg:min-w-[80vh] m-auto p-6 rounded-lg shadow-lg`,children:[e.jsxs("div",{className:"flex justify-between mb-5",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",onClick:()=>{p(!1)},className:"size-10 text-red-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),e.jsx("button",{type:"submit",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-10 text-green-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})})})]}),e.jsx("h3",{className:"mb-5 text-xl lg:text-2xl font-bold",children:"Add Reminder"}),e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Title:"}),e.jsx("input",{type:"text",placeholder:"Enter title",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("title",{required:"Title is required"})}),r.title&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.title.message})]}),e.jsxs("div",{className:"relative col-span-1",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Date & Time:"}),e.jsx("input",{type:"datetime-local",min:new Date().toISOString().slice(0,16),className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("dateTime",{required:"DateTime is required"})}),r.dateTime&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.dateTime.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mt-4",children:[e.jsx("label",{className:`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Interval"}),e.jsxs("select",{className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("repeatInterval",{required:"Interval is required"}),children:[e.jsx("option",{value:"ONE_TIME",children:"ONE_TIME"}),e.jsx("option",{value:"DAILY",children:"DAILY"}),e.jsx("option",{value:"WEEKLY",children:"WEEKLY"})]})]}),e.jsxs("div",{className:"relative col-span-2 lg:mt-4 mb-4",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Description:"}),e.jsx("textarea",{className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("description",{required:"Description is required"})}),r.description&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.description.message})]})]})]})}),N&&e.jsx("form",{onSubmit:f(S),className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40",children:e.jsxs("div",{className:` ${s?"bg-custom-dark":"bg-white"}  lg:min-w-[80vh] m-auto p-6 rounded-lg shadow-lg`,children:[e.jsxs("div",{className:"flex justify-between mb-5",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",onClick:()=>{L()},className:"size-10 text-red-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),e.jsx("button",{type:"submit",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-10 text-green-500 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})})})]}),e.jsx("h3",{className:"mb-5 text-xl lg:text-2xl font-bold",children:"Update Reminder"}),e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Title:"}),e.jsx("input",{type:"text",placeholder:"Enter title",className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("title",{required:"Title is required"})}),r.title&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.title.message})]}),e.jsxs("div",{className:"relative col-span-1",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Date & Time:"}),e.jsx("input",{type:"datetime-local",min:new Date().toISOString().slice(0,16),className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("dateTime",{required:"DateTime is required"})}),r.dateTime&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.dateTime.message})]}),e.jsxs("div",{className:"relative col-span-1 lg:mt-4 ",children:[e.jsx("label",{htmlFor:"drainCount",className:`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Interval"}),e.jsxs("select",{className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("repeatInterval",{required:"Interval is required"}),children:[e.jsx("option",{value:"ONE_TIME",children:"ONE_TIME"}),e.jsx("option",{value:"DAILY",children:"DAILY"}),e.jsx("option",{value:"WEEKLY",children:"WEEKLY"})]})]}),e.jsxs("div",{className:"relative col-span-2 lg:mt-4",children:[e.jsx("label",{className:`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${s?"bg-custom-dark":"bg-white"} font-semibold`,children:"Description:"}),e.jsx("textarea",{className:`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${s?"bg-custom-dark":"bg-white"} border border-black rounded-lg focus:outline-none transition-colors duration-200`,...l("description",{required:"Description is required"})}),r.description&&e.jsx("p",{className:"text-red-500 absolute lg:text-lg text-sm",children:r.description.message})]})]}),e.jsxs("div",{className:"w-full flex flex-col justify-center",children:[e.jsx("div",{className:"mx-auto",onClick:()=>$(),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"lg:size-12 size-8 mx-auto lg:p-2 p-1 rounded-full bg-red-500 text-white cursor-pointer mt-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"})})}),e.jsx("p",{className:"text-center font-semibold",children:"Delete this log"})]})]})}),y&&e.jsx("div",{className:"fixed inset-0 px-4 py-2 flex items-center justify-center z-50",children:e.jsx(B,{className:"animate-spin text-green-500 text-6xl"})})]})]})]})})}export{G as default};
