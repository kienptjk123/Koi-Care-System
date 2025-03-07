import{d as E,r as l,j as e,a as f}from"./index-D0YIHR4A.js";import{L as I,H as L}from"./LeftSideBar-C-k9Lfu9.js";import{T as M}from"./TopLayout-DETw-guT.js";import"./index-iH4zfJEX.js";import"./index-BMdVHJVA.js";import"./index-eUZTU6MH.js";import"./index-aIHYwc5K.js";/* empty css            */import"./logo-DG-ZgLhE.js";import"./Typography-CvIXc89m.js";function O(){const{isDarkMode:v}=E(),[i,N]=l.useState([]),[t,g]=l.useState(null),[a,w]=l.useState(.001),[n,y]=l.useState(.001),[b,u]=l.useState(0),[r,S]=l.useState(100),[C,P]=l.useState(0),[p,k]=l.useState(0),F=async()=>{try{const s=localStorage.getItem("token"),c=localStorage.getItem("id");if(!s)throw new Error("No token found");const o=(await f.get(`https://koicaresystemv2.azurewebsites.net/api/koiponds/user/${c}/koiponds`,{headers:{Authorization:`Bearer ${s}`}})).data.data,m=await Promise.all(o.map(async x=>{var j;try{const h=await f.get(`https://koicaresystemv2.azurewebsites.net/api/water-parameters/getLatestByKoiPondId/${x.id}`,{headers:{Authorization:`Bearer ${s}`}});return{...x,salt:(j=h.data.data)==null?void 0:j.salt}}catch(h){return h.response&&h.response.status===404?{...x,salt:null}:(console.error(`Error fetching salt for pond ${x.id}:`,h),{...x,salt:null})}}));N(m),console.log(m)}catch(s){console.error("Error fetching ponds:",s)}};l.useEffect(()=>{F()},[]),l.useEffect(()=>{i.length===1&&g(i[0])},[i]);const $=s=>{const c=s.target.value;if(c==="all")t||g(null);else{const d=i.find(o=>o.id===parseInt(c));d&&g(d)}};l.useEffect(()=>{if(t&&a>=0&&n>=0){const s=t.volume,c=r/100*s;if(a<n){const o=r/100,m=Math.log(a/n)/Math.log(1-o);k(Math.ceil(m)),u(0)}else{const o=(a-n)*s*10;u(o)}const d=c*a*10;P(d)}},[t,a,n,r]);const R=t&&t.salt!==null?(.1-t.salt)*t.volume*10:0,A=t&&t.salt!==null?(.3-t.salt)*t.volume*10:0;return e.jsx("div",{children:e.jsxs("div",{className:"h-screen flex",children:[e.jsx(I,{}),e.jsxs("div",{className:`relative ${v?"bg-custom-dark text-white":"bg-white text-black"} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`,children:[e.jsx(L,{}),e.jsxs("div",{className:"py-5 px-[30px] mx-auto max-w-[1750px]",children:[e.jsx(M,{text:"Salt Calculator"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"p-4 lg:text-lg text-sm flex lg:items-center lg:flex-row flex-col lg:gap-5 gap-3",children:[e.jsx("label",{htmlFor:"ponds",children:"Select a Pond:"}),e.jsxs("select",{id:"ponds",className:"border rounded p-2 text-black",onChange:$,value:t?t.id:"all",children:[e.jsx("option",{value:"all",disabled:!0,children:"All Ponds"})," ",i.length>0?i.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id)):e.jsx("option",{disabled:!0,children:"Loading ponds..."})]})]}),e.jsxs("div",{className:"grid grid-cols-4 p-4 text-lg",children:[e.jsxs("div",{className:"lg:col-span-2 col-span-4",children:[t&&e.jsxs("div",{className:"pl-4",children:[e.jsx("strong",{children:"Salt:"}),t.salt>=0?`${t.salt}%`:"No water parameters in pond"]}),t&&e.jsx("div",{className:"pl-4",children:t.salt&&parseFloat(t.salt)<.1?e.jsxs("p",{children:[e.jsx("strong",{children:"Recommendation:"})," The current salt concentration is too low. It is recommended to add salt to bring the salinity up to the ideal range (0.1% - 0.3%). You need approximately"," ",R.toFixed(2)," - ",A.toFixed(2)," grams of salt."]}):t.salt&&parseFloat(t.salt)>.3?e.jsxs("p",{children:[e.jsx("strong",{children:"Recommendation:"})," The current salt concentration is too high. Consider performing water changes to lower the salinity to the ideal range (0.1% - 0.3%). Follow the calculated water changes needed."]}):e.jsxs("p",{children:[e.jsx("strong",{children:"Recommendation:"})," The current salt concentration is within the ideal range (0.1% - 0.3%). Maintain this level for optimal Koi health."]})}),t?e.jsx("div",{className:" p-4",children:e.jsxs("p",{className:"lg:text-lg text-sm",children:[e.jsx("strong",{children:"Pond Volume:"})," ",t.volume," liters"]})}):e.jsx("div",{className:"p-4",children:e.jsx("p",{children:e.jsx("strong",{children:"Please select a pond."})})}),e.jsx("div",{className:"p-4",children:e.jsxs("label",{className:"lg:text-lg text-sm",children:["Current Salinity (%):",e.jsx("input",{type:"range",min:"0.001",max:"2",step:"0.001",value:n,onChange:s=>y(s.target.value),className:"slider-thumb",style:{"--value":`${n/2*100}%`}}),e.jsxs("span",{className:"ml-2",children:[n,"%"]})]})}),e.jsx("div",{className:"p-4 lg:text-lg text-sm",children:e.jsxs("label",{children:["Desired Salinity (%):",e.jsx("input",{type:"range",min:"0.001",max:"2",step:"0.001",value:a,onChange:s=>w(s.target.value),className:"slider-thumb",style:{"--value":`${a/2*100}%`}}),e.jsxs("span",{className:"ml-2",children:[a,"%"]})]})}),e.jsx("div",{className:"p-4",children:e.jsxs("label",{className:"lg:text-lg text-sm",children:["Water Change Percentage (%):",e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:r,onChange:s=>S(s.target.value),className:"slider-thumb",style:{"--value":`${r}%`}}),e.jsxs("span",{className:"ml-2",children:[r,"% ("," ",t?(r/100*t.volume).toFixed(2):0," liters)"]})]})})]}),e.jsxs("div",{className:"lg:col-span-2 col-span-4 text-black border justify-center bg-white lg:py-20 py-5 px-5 rounded shadow",children:[e.jsx("h2",{className:"lg:text-lg text-sm",children:"Notice on Salt Usage for Koi Ponds:"}),e.jsxs("ul",{className:"list-disc p-3",children:[e.jsxs("li",{className:"lg:text-lg text-sm text-justify",children:["Ideal salt concentration ",e.jsx("strong",{children:"(0.1% - 0.3%)"}),": to reduce stress and support fish health."]}),e.jsxs("li",{className:"lg:text-lg text-sm text-justify",children:["Use higher concentrations ",e.jsx("strong",{children:"(0.4% - 2%)"}),": only in cases of severe illness, and only for short periods."]}),e.jsx("li",{className:"lg:text-lg text-sm text-justify",children:"Avoid frequent use of high salt levels to protect the pond ecosystem and prevent stress to the fish."})]}),e.jsx("p",{className:"pt-2 lg:text-lg text-sm text-justify",children:"Always monitor the fish’s health and the salt concentration in the water to maintain a stable environment."}),e.jsx("p",{className:"pt-2 lg:text-lg text-sm text-justify",children:"Note: If you're unsure about the proper salt dosage or your fish’s condition, consult with a veterinarian experienced."})]})]}),a<n&&p>0?e.jsx("div",{className:"min-w-full bottom-5 pr-10",children:e.jsx("div",{className:"footer w-2/4 bg-slate-600 text-white border-solid rounded-lg mx-auto py-5 text-xl text-center",children:e.jsxs("div",{className:"row space-x-60",children:[e.jsx("label",{children:e.jsx("strong",{children:"Number of Water Changes Required:"})}),e.jsxs("label",{children:[p," times"]})]})})}):e.jsx("div",{className:"min-w-full bottom-5 px-4 lg:pr-10",children:e.jsxs("div",{className:"footer lg:w-2/4 w-full bg-slate-600 text-white border-solid lg:rounded-lg mx-auto py-5 text-xl text-center flex flex-col justify-center items-center",children:[e.jsxs("div",{className:"row flex justify-between w-full px-10",children:[e.jsx("label",{children:e.jsx("strong",{className:"pt-2 lg:text-lg text-sm",children:"Amount of Salt Needed:"})}),e.jsxs("label",{className:"pt-2 lg:text-lg text-sm",children:[b.toFixed(2)," grams"]})]}),e.jsxs("div",{className:"row flex justify-between w-full px-10 mt-4",children:[e.jsx("label",{children:e.jsx("strong",{className:"pt-2 lg:text-lg text-sm",children:"Per water change(refill):"})}),e.jsxs("label",{className:"pt-2 lg:text-lg text-sm",children:[C.toFixed(2)," grams"]})]})]})})]})]})]})]})})}export{O as default};
