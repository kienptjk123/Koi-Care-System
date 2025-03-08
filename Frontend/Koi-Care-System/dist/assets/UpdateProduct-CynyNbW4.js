import{e as q,d as z,u as L,r as i,j as t,a as l,B as p}from"./index-DsR5MBtH.js";import{L as T,H as _}from"./LeftSideBar-CeYCRzgh.js";import{T as A}from"./TopLayoutShop-CQxrzWXR.js";import{a as M}from"./index.esm-XLeKDvWu.js";import{i as V}from"./react-select-animated.esm-D4NHEJgi.js";import{S as U}from"./react-select.esm-MqXYraHf.js";import"./index-BMqfeWhp.js";import"./index-gO7psG0g.js";import"./index-DSRF4rO0.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./toPropertyKey-PLuKRk1e.js";const H=V();function oe(){const{id:n}=q(),{isDarkMode:s}=z(),y=L(),[m,b]=i.useState(!1),[R,u]=i.useState(!0),[a,x]=i.useState([]),[h,F]=i.useState([]),[f,N]=i.useState([]),[k,w]=i.useState([]),[g,j]=i.useState([]),{register:d,handleSubmit:v,formState:{errors:r},reset:S}=M(),$=async()=>{try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");const o=await l.get("https://koicaresystemv2.azurewebsites.net/api/issues/issueType/all",{headers:{Authorization:`Bearer ${e}`}});w(o.data.data.map(c=>({value:c.id,label:`${c.parameterType} - ${c.conditionType}`})))}catch(e){console.log("Error fetching issue type:",e)}};i.useEffect(()=>{$()},[]);const E=async()=>{try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");const o=await l.get("https://koicaresystemv2.azurewebsites.net/api/categories/all",{headers:{Authorization:`Bearer ${e}`}});F(o.data.data)}catch(e){console.log("Error fetching category:",e)}};i.useEffect(()=>{E()},[]);const I=async()=>{try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");const o=await l.get("https://koicaresystemv2.azurewebsites.net/api/suppliers/all",{headers:{Authorization:`Bearer ${e}`}});N(o.data.data)}catch(e){console.log("Error fetching tags:",e)}};i.useEffect(()=>{I()},[]);const C=async()=>{try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");const o=await l.get(`https://koicaresystemv2.azurewebsites.net/api/products/product/${n}/product`,{headers:{Authorization:`Bearer ${e}`}});x(o.data.data),S(o.data.data)}catch(e){console.error("Error fetching Product:",e),p.error("Failed to fetch Product details.")}finally{u(!1)}};i.useEffect(()=>{C()},[n]);const P=async e=>{u(!0),b(!0);try{const o=localStorage.getItem("token");if(!o)throw new Error("No token found");const c=g.map(D=>D.value),O=await l.put(`https://koicaresystemv2.azurewebsites.net/api/products/product/${n}/update`,{name:e.name,brand:e.brand,price:e.price,inventory:e.inventory,description:e.description,description_detail:e.description_detail,category:{id:a.category.id,name:a.category.name},supplierName:e.supplierName,issueTypeId:c},{headers:{Authorization:`Bearer ${o}`}});p.success("Product updated successfully!"),y("/shop/product")}catch(o){console.log(e.id),console.log(o),p.error("Failed to update Product.")}finally{b(!1),u(!1)}},B=e=>{P(e)};return t.jsxs("div",{className:"h-screen flex",children:[t.jsx(T,{}),t.jsxs("div",{className:`relative ${s?"bg-custom-light text-white":"bg-white text-black"} overflow-y-auto flex-1 flex-col  overflow-x-hidden duration-200 ease-linear`,children:[t.jsx(_,{}),t.jsxs("div",{className:"py-5 pb-0 px-[30px] mx-auto",children:[t.jsx(A,{text:"Product",textName:"Update Product",links:"shop/product"}),t.jsx("div",{className:"p-6 rounded-md border",children:t.jsxs("form",{onSubmit:v(B),noValidate:!0,children:[t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"name",className:"block text-sm font-medium mb-2",children:"Product Name"}),t.jsx("input",{type:"text",id:"name",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.name?"border-red-500":"border-gray-300"}`,...d("name",{required:"Name is required",minLength:2,maxLength:50})}),r.name&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.name.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"brand",className:"block text-sm font-medium mb-2",children:"Brand"}),t.jsx("input",{type:"text",id:"brand",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.brand?"border-red-500":"border-gray-300"}`,...d("brand",{required:"Brand is required"})}),r.brand&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.brand.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"price",className:"block text-sm font-medium mb-2",children:"Price"}),t.jsx("input",{type:"number",id:"price",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.price?"border-red-500":"border-gray-300"}`,...d("price",{required:"Price is required"})}),r.price&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.price.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"inventory",className:"block text-sm font-medium mb-2",children:"Inventory"}),t.jsx("input",{type:"number",id:"inventory",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.inventory?"border-red-500":"border-gray-300"}`,...d("inventory",{required:"Inventory is required"})}),r.inventory&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.inventory.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"description",className:"block text-sm font-medium mb-2",children:"Description"}),t.jsx("textarea",{id:"description",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.description?"border-red-500":"border-gray-300"}`,...d("description",{required:"Description is required"})}),r.description&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.description.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"description_detail",className:"block text-sm font-medium mb-2",children:"Detailed Description"}),t.jsx("textarea",{id:"description_detail",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.description_detail?"border-red-500":"border-gray-300"}`,...d("description_detail",{required:"Detailed description is required"})}),r.description_detail&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.description_detail.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"category",className:"block text-sm font-medium mb-2",children:"Category"}),t.jsxs("select",{id:"category",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.category?"border-red-500":"border-gray-300"}`,defaultValue:a.category?a.category.id:"null",onChange:e=>{const o=h.find(c=>c.id==e.target.value);x({...a,category:o})},children:[a.category&&t.jsx("option",{value:a.category.id,children:a.category.name}),h.map(e=>t.jsx("option",{value:e.id,children:e.name},e.id))]}),r.category&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.category.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"supplierName",className:"block text-sm font-medium mb-2",children:"Supplier"}),t.jsxs("select",{id:"supplierName",className:`w-full p-2 border rounded-md ${s?"bg-custom-dark text-white":"bg-white text-black"} ${r.supplierName?"border-red-500":"border-gray-300"}`,...d("supplierName"),children:[t.jsx("option",{value:a.supplier?a.supplier.name:"",children:a.supplier?a.supplier.name:""}),f.map(e=>t.jsx("option",{value:e.name,children:e.name},e.id))]}),r.supplierName&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.supplierName.message})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"issueTypeId",className:"block text-sm font-medium mb-2",children:"Select Issue"}),t.jsx(U,{isMulti:!0,options:k,value:g,onChange:j,closeMenuOnSelect:!1,components:H,styles:{control:(e,o)=>({...e,backgroundColor:s?"#1F2937":"#FFFFFF",color:s?"#FFFFFF":"#000000",borderColor:r.tags?"#EF4444":"#D1D5DB","&:hover":{borderColor:r.tags?"#EF4444":"#9CA3AF"}}),menu:e=>({...e,backgroundColor:s?"#1F2937":"#FFFFFF"}),option:(e,o)=>({...e,backgroundColor:o.isFocused?s?"#374151":"#E5E7EB":s?"#1F2937":"#FFFFFF",color:s?"#FFFFFF":"#000000"}),multiValue:e=>({...e,backgroundColor:s?"#4B5563":"#E5E7EB",color:s?"#FFFFFF":"#000000"}),multiValueLabel:e=>({...e,color:s?"#FFFFFF":"#000000"}),multiValueRemove:e=>({...e,color:s?"#FFFFFF":"#000000",":hover":{backgroundColor:s?"#374151":"#D1D5DB",color:s?"#F87171":"#EF4444"}})}})]}),t.jsx("button",{type:"submit",className:`mt-5 w-full bg-blue-600 text-white p-2 rounded-md ${m?"opacity-50 cursor-not-allowed":""}`,disabled:m,children:m?"Update...":"Update Product"})]})})]})]})]})}export{oe as default};
