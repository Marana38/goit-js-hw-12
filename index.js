/* empty css                      */import{a as y,S as L,i}from"./assets/vendor-61TxKDl8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="46890776-0488e2a41df654acea73f1764",v="https://pixabay.com/api/";async function g(r,s=1,o=15){try{return(await y.get(v,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}})).data}catch{throw new Error("Faiied ot fetch images")}}function f(r){return r.map(({webformatURL:s,largeImageURL:o,tags:n,likes:e,views:t,comments:a,downloads:p})=>`
      <div class="photo-card">
        <a href="${o}">
          <img src="${s}" alt="${n}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${e}</p>
          <p><b>Views</b> ${t}</p>
          <p><b>Comments</b> ${a}</p>
          <p><b>Downloads</b> ${p}</p>
          
        </div>
      </div>
    `).join("")}let l="",d=1;const m=15,w=document.querySelector("#search-form"),c=document.querySelector(".gallery"),u=document.querySelector(".load-more");let h=new L(".gallery a");i.settings({position:"topRight",timeout:5e3});w.addEventListener("submit",S);u.addEventListener("click",M);async function S(r){if(r.preventDefault(),l=r.target.elements.searchQuery.value.trim(),r.target.elements.searchQuery.value="",!l){i.error({title:"Error",message:"Please enter a search query!"});return}d=1,c.innerHTML="",u.classList.add("hidden"),document.querySelector(".end-message").classList.add("hidden");try{const{hits:o,totalHits:n}=await g(l,d,m);if(!o.length){i.warning({title:"No Results",message:"No images found."});return}c.innerHTML=f(o),h.refresh(),i.success({title:"Success",message:`Found ${n} images!`}),o.length>=m&&u.classList.remove("hidden")}catch{i.error({title:"Error",message:"Something went wrong!"})}}async function M(){d+=1;try{const{hits:r,totalHits:s}=await g(l,d,m);if(c.querySelectorAll(".photo-card").length+r.length>=s){u.classList.add("hidden"),document.querySelector(".end-message").classList.remove("hidden");return}c.insertAdjacentHTML("beforeend",f(r)),h.refresh();const{height:o}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch{i.error({title:"Error",message:"Failed to load more images."})}}
//# sourceMappingURL=index.js.map
