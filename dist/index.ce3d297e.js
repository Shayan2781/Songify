let recently=[];function createSuggestedItem(e,t,n){""!=t&&null!=t||(t="../public/pics/no_cover.jpg");let l=document.createElement("div");l.id=e,l.classList.add("grid-item");let s=document.createElement("img");s.src=t,s.loading="lazy",s.classList.add("suggested-item__pic"),l.appendChild(s);let c=document.createElement("p");return c.classList.add("suggested-item__name"),c.innerText=n,l.appendChild(c),l.addEventListener("click",(function(){console.log(l.id)})),l}function createNewReleases(e,t){""!=t&&null!=t||(t="../public/pics/no_cover.jpg");let n=document.createElement("div");n.classList.add("new-releases__item");let l=document.createElement("img");return l.src=t,l.classList.add("new-releases__item-pic"),l.loading="lazy",n.appendChild(l),n}function setNewReleases(){const e=document.getElementById("new-releases__content-container");for(let t=0;t<7;t++)e?.appendChild(createNewReleases("",songs[t].album.album_thumb))}setNewReleases();
//# sourceMappingURL=index.ce3d297e.js.map