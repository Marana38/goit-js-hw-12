/* empty css                      */import{a as y,S as L,i as n}from"./assets/vendor-61TxKDl8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="46890776-0488e2a41df654acea73f1764",v="https://pixabay.com/api/";async function g(r,s=1,o=15){try{return(await y.get(v,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}})).data}catch{throw new Error("Faiied ot fetch images")}}function f(r){return r.map(({webformatURL:s,largeImageURL:o,tags:a,likes:e,views:t,comments:i,downloads:p})=>`
      <div class="photo-card">
        <a href="${o}">
          <img src="${s}" alt="${a}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${e}</p>
          <p><b>Views</b> ${t}</p>
          <p><b>Comments</b> ${i}</p>
          <p><b>Downloads</b> ${p}</p>
          
        </div>
      </div>
    `).join("")}let l="",d=1;const m=15,w=document.querySelector("#search-form"),c=document.querySelector(".gallery"),u=document.querySelector(".load-more");let h=new L(".gallery a");n.settings({position:"topRight",timeout:5e3});w.addEventListener("submit",S);u.addEventListener("click",M);async function S(r){if(r.preventDefault(),l=r.target.elements.searchQuery.value.trim(),r.target.elements.searchQuery.value="",!l){n.error({title:"Error",message:"Please enter a search query!"});return}d=1,c.innerHTML="",u.classList.add("hidden"),document.querySelector(".end-message").classList.add("hidden");try{const{hits:o,totalHits:a}=await g(l,d,m);if(!o.length){n.warning({title:"No Results",message:"No images found."});return}c.innerHTML=f(o),h.refresh(),n.success({title:"Success",message:`Found ${a} images!`}),o.length>=m&&u.classList.remove("hidden")}catch{n.error({title:"Error",message:"Something went wrong!"})}}async function M(){d+=1;try{const{hits:r,totalHits:s}=await g(l,d,m);c.insertAdjacentHTML("beforeend",f(r)),h.refresh(),c.querySelectorAll(".photo-card").length>=s&&(u.classList.add("hidden"),document.querySelector(".end-message").classList.remove("hidden"));const{height:a}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}catch{n.error({title:"Error",message:"Failed to load more images."})}}
//# sourceMappingURL=index.js.map
