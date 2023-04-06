let recently = [];
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
const container = document.getElementById("view-point");
container?.appendChild(htmlToElement('<nav class="menu"><div class="menu-item">    <a href=""><i class="menu-item__icon fa fa-home "></i></a>    <p class="menu-item__label">Home</p></div><div class="menu-item">   <a href=""><i class="menu-item__icon fa fa-search "></i></a></div><p class="menu-item__label">Search</p><div class="menu-item">    <a href=""><i class="menu-item__icon fa fa-bookmark "></i></a>    <p class="menu-item__label">Your Library</p></div> </nav>'));
function createSuggestedItem(id, imgSrc, songName) {
    if (imgSrc == "" || imgSrc == null) imgSrc = "../public/pics/no_cover.jpg";
    let container = document.createElement("div");
    container.id = id;
    container.classList.add("grid-item");
    let img = document.createElement("img");
    img.src = imgSrc;
    img.loading = "lazy";
    img.classList.add("suggested-item__pic");
    container.appendChild(img);
    let label = document.createElement("p");
    label.classList.add("suggested-item__name");
    label.innerText = songName;
    container.appendChild(label);
    container.addEventListener("click", function() {
        console.log(container.id);
    });
    return container;
}
function createNewReleases(id, imgSrc) {
    if (imgSrc == "" || imgSrc == null) imgSrc = "../public/pics/no_cover.jpg";
    let container = document.createElement("div");
    container.classList.add("new-releases__item");
    let img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("new-releases__item-pic");
    img.loading = "lazy";
    container.appendChild(img);
    return container;
} /*function setSuggesteds (){
    const grid = document.getElementById('suggested-grid');
    for ( let i = 0 ; i < 6 ; i++){
        let rand = Math.floor(Math.random() * songs!.length);
        let rand2 = Math.floor(Math.random() * songs![rand].musics.length);
        grid?.appendChild(createSuggestedItem(songs![rand].musics[rand2].id.toString(),songs![rand].musics[rand2].track_thumb, songs![rand].musics[rand2].track_name));
    }
}

function setNewReleases (){
    const grid = document.getElementById('new-releases__content-container');
    for (let i = 0 ; i < 7 ; i++ ){
        grid?.appendChild(createNewReleases("", songs[i].album.album_thumb))
    }

}

//setSuggesteds();
setNewReleases();*/ 

//# sourceMappingURL=index.13f85c42.js.map
