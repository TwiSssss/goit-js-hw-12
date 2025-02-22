import{a as f,S as h,i as c}from"./assets/vendor-C_7oAj77.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const m="48857458-08a5976c2d7ede66ca4c44a57",b="https://pixabay.com/api/",L=40,u=(e,t=1)=>f.get(b,{params:{key:m,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:L,page:t}}).then(r=>({images:r.data.hits,totalHits:r.data.totalHits})).catch(r=>(console.error(r),[]));function M(e){return`
<li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
            <p>
                <b>Likes</b><br>${e.likes}
            </p>
            <p>
                <b>Views</b><br>${e.views}
            </p>
            <p>
                <b>Comments</b><br>${e.comments}
            </p>
            <p>
                <b>Downloads</b><br>${e.downloads}
            </p>
        </div>
    </a>
</li>
`}function d(e){return e.map(M).join("")}let p=new h(".gallery-item a",{captionsData:"alt",captionDelay:250});const a={gallery:document.querySelector(".gallery"),searchMenu:document.querySelector(".search-menu"),searchBtn:document.querySelector(".search-btn"),searchInput:document.querySelector(".search-input"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".btn-load")},n={query:"",page:1,total:0,perPage:40};a.searchMenu.addEventListener("submit",async e=>{e.preventDefault();const t=a.searchInput.value.trim();if(n.page=1,!!t){n.query=t,a.gallery.innerHTML="",a.searchInput.value="",a.loader.style.display="inline-block";try{const r=await u(t,n.page);n.total=r.totalHits,r.images.length===0?(c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.gallery.innerHTML=""):(a.gallery.innerHTML=d(r.images),p.refresh(),g())}catch(r){console.error(r),a.gallery.innerHTML=""}finally{a.loader.style.display="none"}}});a.btnLoadMore.addEventListener("click",async()=>{const e=n.query;n.page+=1,y(),a.loader.style.display="inline-block";try{const t=await u(e,n.page);n.total=t.totalHits;const r=d(t.images);a.gallery.insertAdjacentHTML("beforeend",r),p.refresh(),window.scrollBy({top:650,left:100,behavior:"smooth"})}catch(t){console.error(t)}finally{a.loader.style.display="none",g()}});function w(){a.btnLoadMore.style.display="block"}function y(){a.btnLoadMore.style.display="none"}function g(){const t=n.total,r=Math.ceil(t/40);n.page>=r?(y(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}
//# sourceMappingURL=index.js.map
