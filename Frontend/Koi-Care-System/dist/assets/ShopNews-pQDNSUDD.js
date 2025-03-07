import{d as v,r as a,u as j,j as e,P as N,a as l,L as h,B as k}from"./index-D0YIHR4A.js";import{L as C,H as y}from"./LeftSideBar-BipZwdxj.js";import{T as B}from"./TopLayoutShop-B_mN4XiN.js";import{u as i,w as I}from"./xlsx-DjuO7_Ju.js";import{S}from"./sweetalert2.esm.all-D3pEHXw3.js";import{D as E}from"./DataGrid-IWRB1K2w.js";import"./index-DfkVdce-.js";import"./index-BMdVHJVA.js";import"./index-aIHYwc5K.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./index-iH4zfJEX.js";import"./toPropertyKey-PLuKRk1e.js";import"./Typography-CvIXc89m.js";import"./SwitchBase-ATyY8G7j.js";import"./InputAdornment-wNGMamr6.js";function W(){const{isDarkMode:r}=v(),[D,g]=a.useState([]),[n,u]=a.useState([]),[T,d]=a.useState(!0),m=j(),x=async()=>{try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const s=await l.get("https://koicaresystemv2.azurewebsites.net/api/tag",{headers:{Authorization:`Bearer ${t}`}});g(s.data.data)}catch(t){console.log("Error fetching tags:",t)}};a.useEffect(()=>{x()},[]);const c=async()=>{try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const s=await l.get("https://koicaresystemv2.azurewebsites.net/api/blog",{headers:{Authorization:`Bearer ${t}`}});u(s.data.data)}catch(t){console.log("Error fetching blogs:",t)}};a.useEffect(()=>{c()},[]);const w=async t=>{const{isConfirmed:s}=await S.fire({title:"Are you sure?",text:"You won’t be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"});if(s){d(!0);try{const o=localStorage.getItem("token");if(!o)throw new Error("No token found");await l.delete(`https://koicaresystemv2.azurewebsites.net/api/blog/delete/${t}`,{headers:{Authorization:`Bearer ${o}`}}),k.success("Blog deleted successfully"),c()}catch(o){console.error("Error deleting blogs:",o)}finally{d(!1)}}},p=[{field:"image",headerName:"Image",width:150,renderCell:t=>e.jsx("div",{className:"h-full flex items-center",children:e.jsx("img",{src:t.row.blogImage,alt:"blog",className:"w-24 h-16 object-cover rounded-md"})})},{field:"blogTitle",headerName:"Blog Title",width:200},{field:"blogContent",headerName:"Blog Content",flex:1,renderCell:t=>e.jsx("div",{children:t.value.replace(/<[^>]+>/g,"")})},{field:"blogDate",headerName:"Date",width:150},{field:"tags",headerName:"Tag",width:300,renderCell:t=>{const s=t.row.tags||[];return e.jsx(e.Fragment,{children:s.map(o=>e.jsx("span",{className:"bg-blue-200 text-blue-800 py-2 px-3 rounded-full text-xs mr-2",children:o.tagName},o.id))})}},{field:"action",headerName:"Action",renderCell:t=>e.jsxs("div",{className:"flex h-full justify-center items-center",children:[e.jsx(h,{to:`/shop/shopNews/update/${t.row.blogId}`,className:" p-1 hover:bg-green-500 text-green-500 hover:text-white  rounded-full",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5   ",children:[e.jsx("path",{d:`M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 \r
              2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 \r
              2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z`}),e.jsx("path",{d:`M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 \r
              3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 \r
              1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z`})]})}),e.jsx(h,{to:`/shop/shopNews/${t.row.blogId} `,className:" p-1 hover:bg-blue-500 text-blue-500 hover:text-white  rounded-full",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5 ",children:[e.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),e.jsx("path",{fillRule:"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z",clipRule:"evenodd"})]})}),e.jsx("button",{className:" p-1 hover:bg-red-500 text-red-600 hover:text-white  rounded-full",onClick:()=>w(t.row.blogId),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5 ",children:e.jsx("path",{fillRule:"evenodd",d:"M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z",clipRule:"evenodd"})})})]})}],f=()=>{const t=i.json_to_sheet(n.map(o=>({ID:o.blogId,Image:o.blogImage,Title:o.blogTitle,Content:o.blogContent,Date:o.blogDate,Tags:o.tags.length>0?o.tags.map(b=>b.tagName).join(", "):"Unknown"}))),s=i.book_new();i.book_append_sheet(s,t,"Blogs"),I(s,"blogs.xlsx")};return e.jsx("div",{children:e.jsxs("div",{className:"h-screen flex",children:[e.jsx(C,{}),e.jsxs("div",{className:`relative ${r?"bg-custom-light text-white":"bg-white text-black"} overflow-y-auto flex-1 flex-col  overflow-x-hidden duration-200 ease-linear`,children:[e.jsx(y,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px] ",children:[e.jsx(B,{text:"News",links:"shop/shopNews"}),e.jsxs("div",{className:"w-full flex justify-between items-center relative",children:[e.jsx("button",{className:"mb-4 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md",onClick:()=>m("/shop/createNews"),children:"New Blog"}),e.jsx("button",{onClick:f,className:"mb-4 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md",children:"Download Excel"})]}),e.jsx(N,{sx:{height:670},children:e.jsx(E,{rows:n,columns:p,pageSize:10,pageSizeOptions:[5,10,20,50,100],rowHeight:80,checkboxSelection:!0,disableExtendRowFullWidth:!0,disableSelectionOnClick:!0,getRowId:t=>t.blogId,sx:{"& .MuiDataGrid-columnHeaders":{backgroundColor:r?"#333":"#f5f5f5"},"& .MuiDataGrid-row:hover":{backgroundColor:r?"rgb(36 48 63 / var(--tw-bg-opacity))":"#e0e0e0"}}})})]})]})]})})}export{W as default};
