import{d as j,r as s,u as N,j as t,P as k,a as h,L as m,B as y}from"./index-D0YIHR4A.js";import{L as C,H as P}from"./LeftSideBar-BipZwdxj.js";import{T as S}from"./TopLayout-DETw-guT.js";import{u as i,w as B}from"./xlsx-DjuO7_Ju.js";import{S as Z}from"./sweetalert2.esm.all-D3pEHXw3.js";import{D as M}from"./DataGrid-IWRB1K2w.js";import"./index-DfkVdce-.js";import"./index-BMdVHJVA.js";import"./index-aIHYwc5K.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./index-iH4zfJEX.js";import"./toPropertyKey-PLuKRk1e.js";import"./Typography-CvIXc89m.js";import"./SwitchBase-ATyY8G7j.js";import"./InputAdornment-wNGMamr6.js";const x=a=>a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")+" đ";function O(){const{isDarkMode:a}=j(),[l,p]=s.useState([]),[D,n]=s.useState(!0);s.useState([]);const w=N(),f="https://5sfashion.vn/storage/upload/images/posts/Z5FgdGRa5ycTaCqcMZnHfZTkb7FyHATji17rlS4q.jpg",d=async()=>{try{const r=localStorage.getItem("token");if(!r)throw new Error("No token found");const o=await h.get("https://koicaresystemv2.azurewebsites.net/api/products/all",{headers:{Authorization:`Bearer ${r}`}});p(o.data.data)}catch(r){console.log("Error fetching products:",r)}};s.useEffect(()=>{d()},[]);const g=async r=>{const{isConfirmed:o}=await Z.fire({title:"Are you sure?",text:"You won’t be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"});if(o){n(!0);try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");await h.delete(`https://koicaresystemv2.azurewebsites.net/api/products/product/${r}/delete`,{headers:{Authorization:`Bearer ${e}`}}),y.success("Product deleted successfully"),d()}catch(e){console.error("Error deleting product:",e)}finally{n(!1)}}},v=[{field:"image",headerName:"Image",width:150,renderCell:r=>{var o,e;return t.jsx("div",{className:"h-full flex items-center",children:t.jsx("img",{src:((e=(o=r.row.images)==null?void 0:o[0])==null?void 0:e.downloadUrl)||f,alt:"Product",className:"w-24 h-16 object-cover rounded-md "})})}},{field:"name",headerName:"Product Name",flex:.5},{field:"brand",headerName:"Brand",flex:.5},{field:"price",headerName:"Price",width:120,renderCell:r=>x(r.row.price)},{field:"inventory",headerName:"Inventory",width:150},{field:"category",headerName:"Category",width:150,renderCell:r=>{var o,e;return((e=(o=r.row)==null?void 0:o.category)==null?void 0:e.name)||"Unknown"}},{field:"supplier",headerName:"Supplier",width:200,renderCell:r=>{var o,e;return((e=(o=r.row)==null?void 0:o.supplier)==null?void 0:e.name)||"Unknown"}},{field:"action",headerName:"Action",renderCell:r=>t.jsxs("div",{className:"flex h-full justify-center items-center",children:[t.jsx(m,{to:`/shop/product/${r.row.id}`,className:"p-1 hover:bg-green-500 text-green-500 hover:text-white rounded-full",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5",children:[t.jsx("path",{d:"M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"}),t.jsx("path",{d:"M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"})]})}),t.jsx(m,{to:`/shop/product/view/${r.row.id} `,className:" p-1 hover:bg-blue-500 text-blue-500 hover:text-white  rounded-full",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5 ",children:[t.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),t.jsx("path",{fillRule:"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z",clipRule:"evenodd"})]})}),t.jsx("button",{className:"p-1 hover:bg-red-500 text-red-600 hover:text-white rounded-full",onClick:()=>g(r.row.id),children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-5",children:t.jsx("path",{fillRule:"evenodd",d:`M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005\r
                  13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0\r
                  1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 \r
                  52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0\r
                  1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428\r
                  1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75\r
                  0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z`,clipRule:"evenodd"})})})]})}],b=()=>{const r=i.json_to_sheet(l.map(e=>{var c,u;return{ID:e.id,"Product Name":e.name,Brand:e.brand,Price:x(e.price),Inventory:e.inventory,Category:((c=e==null?void 0:e.category)==null?void 0:c.name)||"Unknown",Supplier:((u=e==null?void 0:e.supplier)==null?void 0:u.name)||"Unknown",Decription:e.description,"Description detail":e.description_detail}})),o=i.book_new();i.book_append_sheet(o,r,"Products"),B(o,"Products.xlsx")};return t.jsxs("div",{className:"h-screen flex",children:[t.jsx(C,{}),t.jsxs("div",{className:`relative flex-1 overflow-y-auto duration-200 ${a?"bg-custom-light text-white":"bg-white text-black"}`,children:[t.jsx(P,{}),t.jsxs("div",{className:"py-5 px-8 max-w-[1750px] mx-auto",children:[t.jsx(S,{text:"Products",links:"shop/product"}),t.jsxs("div",{className:"w-full flex justify-between items-center relative",children:[t.jsx("div",{className:"cursor-pointer",children:t.jsx("button",{className:"py-2 mb-4 px-3 bg-blue-500 text-white hover:bg-blue-700  rounded-md",onClick:()=>w("/shop/createProduct"),children:"New Product"})}),t.jsx("div",{className:"cursor-pointer",children:t.jsx("button",{onClick:b,className:"py-2 mb-4 px-3 bg-blue-500 text-white hover:bg-blue-700 rounded-md",children:"Download Excel"})})]}),t.jsx(k,{sx:{height:670},children:t.jsx(M,{rows:l,columns:v,pageSize:10,pageSizeOptions:[5,10,20,50,100],rowHeight:80,checkboxSelection:!0,disableExtendRowFullWidth:!0,sx:{"& .MuiDataGrid-columnHeaders":{backgroundColor:a?"#333":"#f5f5f5"},"& .MuiDataGrid-row:hover":{backgroundColor:a?"rgb(36 48 63 / var(--tw-bg-opacity))":"#e0e0e0"}}})})]})]})]})}export{O as default};
