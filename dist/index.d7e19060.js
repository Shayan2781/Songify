function e(e){var n=document.createElement("template");return e=e.trim(),n.innerHTML=e,n.content.firstChild}function n(n){let i=n.track_thumb;null!=i&&""!=i||(i="../public/pics/no_cover.jpg");let t=e(`\n    <div id = "${n.id}"class="grid-item">\n        <img loading="lazy" class="suggested-item__pic" src="${i}" alt="">\n        <p class="suggested-item__name">${n.track_name}</p>\n    </div>\n    `);return t.addEventListener("click",(function(){console.log(t.id)})),t}function i(n){let i=e(`<div id = "${n.id}" class="recently-played__item">\n    <img loading="lazy" class="recently-played__item-img" src="${n.track_thumb}" alt="">\n    <p class="recently-played__item-name">${n.track_name}</p>\n    </div>`);return i.addEventListener("click",(function(){console.log(i.id)})),i}function t(n){let i=n.album_thumb;null!=i&&""!=i||(i="../public/pics/no_cover.jpg");let t=e(`<div id = "${n.id}" class="new-releases__item">\n    <img loading="lazy" class="new-releases__item-pic" src="${i}" alt="">\n    </div>`);return t.addEventListener("click",(function(){console.log(t.id)})),t}function a(a){const s=document.getElementById("main-body");s.appendChild(function(i){const t=e('<div id = "suggested-grid" class="suggested-grid"></div>'),a=e('\n    <section class="main-container__suggested home__section">\n        <h2 class="section-header">Suggested</h2>\n    </section>');for(let e=0;e<6;e++){let e=Math.floor(Math.random()*i.length),a=Math.floor(Math.random()*i[e].musics.length);t.appendChild(n(i[e].musics[a]))}return a.appendChild(t),a}(a)),s.appendChild(function(n){let t=e('<div id="recently-played__content-container" class="scroll-container">\n    </div>');for(let e=10;e<18;e++)t.appendChild(i(n[e].musics[0]));let a=e('<section class="main-container__recently-played home__section">\n    <h2 class="section-header">Recently Played</h2>\n    </section> ');return a.appendChild(t),a}(a)),s.appendChild(function(n){let i=e('<div id="new-releases__content-container" class="scroll-container new-releases">\n    </div>');for(let e=0;e<6;e++)i.appendChild(t(n[e].album));let a=e('<section class="main-container__new-releases home__section">\n    <h2 class="section-header">New Releases</h2>\n    </section>  ');return a.appendChild(i),a}(a))}document.getElementById("view-point")?.appendChild(e('<div id = "main-body" class="main-body"></div>')),document.getElementById("view-point")?.appendChild(e('\n    <nav class="menu">\n        <div class="menu-item">\n            <a href=""><i class="menu-item__icon fa fa-home "></i></a>\n            <p class="menu-item__label">Home</p>\n        </div>\n        <div class="menu-item">\n            <a href=""><i class="menu-item__icon fa fa-search "></i></a>\n            <p class="menu-item__label">Search</p>\n        </div>\n        <div class="menu-item">\n            <a href=""><i class="menu-item__icon fa fa-bookmark "></i></a>\n            <p class="menu-item__label">Your Library</p>\n        </div> \n    </nav>\n    ')),fetch("./data/songs.json").then((e=>e.json())).then((e=>{a(e)}));
//# sourceMappingURL=index.d7e19060.js.map