let recently=[];function htmlToElement(e){var t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild}const container=document.getElementById("view-point");function createSuggestedItem(e,t,n){""!=t&&null!=t||(t="../public/pics/no_cover.jpg");let i=document.createElement("div");i.id=e,i.classList.add("grid-item");let a=document.createElement("img");a.src=t,a.loading="lazy",a.classList.add("suggested-item__pic"),i.appendChild(a);let l=document.createElement("p");return l.classList.add("suggested-item__name"),l.innerText=n,i.appendChild(l),i.addEventListener("click",(function(){console.log(i.id)})),i}function createNewReleases(e,t){""!=t&&null!=t||(t="../public/pics/no_cover.jpg");let n=document.createElement("div");n.classList.add("new-releases__item");let i=document.createElement("img");return i.src=t,i.classList.add("new-releases__item-pic"),i.loading="lazy",n.appendChild(i),n}container?.appendChild(htmlToElement('<nav class="menu"><div class="menu-item">    <a href=""><i class="menu-item__icon fa fa-home "></i></a>    <p class="menu-item__label">Home</p></div><div class="menu-item">   <a href=""><i class="menu-item__icon fa fa-search "></i></a></div><p class="menu-item__label">Search</p><div class="menu-item">    <a href=""><i class="menu-item__icon fa fa-bookmark "></i></a>    <p class="menu-item__label">Your Library</p></div> </nav>'));
//# sourceMappingURL=index.788e83d1.js.map
