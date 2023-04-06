import { addToRecentlyPlayed, addToRout, recentlyPlayed, routingTracked } from '..';
import { Album, Music, Root, Root2 } from '../data/SongFormatter';
import songs from '../data/songs.json';
import { createAlbumPage } from './AlbumPageComponents';
import { createLibraryPage } from './LibraryComponents';
import { createPlayPage, stopSong } from './PlayComponents';
import { createSearchPage } from './SearchComponents';

type Pair = {
    n1 : number;
    n2 : number;
}

export function htmlToElement(html : string) : HTMLScriptElement{
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return <HTMLScriptElement>template.content.firstChild!;
}

function createNavbar (){
    const navBarHTML : string = `
    <nav class="menu">
        <div class="menu-item">
            <i class="menu-item__icon fa fa-home selected"></i>
            <p class="menu-item__label">Home</p>
        </div>
        <div class="menu-item">
            <i class="menu-item__icon fa fa-search "></i>
            <p class="menu-item__label">Search</p>
        </div>
        <div class="menu-item">
            <i class="menu-item__icon fa fa-bookmark "></i>
            <p class="menu-item__label">Your Library</p>
        </div> 
    </nav>
    `;
    document.getElementById('view-point')?.appendChild(htmlToElement(navBarHTML));
}

function setNavbarLocating (){
    let navs = document.querySelectorAll('.menu-item');
    let icons = document.querySelectorAll('.menu-item__icon')
    navs[0].addEventListener('click', function(){
        createHomePage();
        icons[0].classList.add('selected');
        icons[1].classList.remove('selected');
        icons[2].classList.remove('selected');
    });
    navs[1].addEventListener('click', function(){
        createSearchPage();
        icons[1].classList.add('selected');
        icons[0].classList.remove('selected');
        icons[2].classList.remove('selected');
    });
    navs[2].addEventListener('click', function(){
        createLibraryPage();
        icons[2].classList.add('selected');
        icons[1].classList.remove('selected');
        icons[0].classList.remove('selected');
    });
}

let suggestedsPlaylist : Music[] = [];

function createSuggestedSection (songs : Root){
    suggestedsPlaylist = [];
    const sectionHTML = `
    <section class="main-container__suggested home__section">
        <h2 class="section-header">Suggested</h2>
    </section>`;
    const gridContainer = htmlToElement('<div id = "suggested-grid" class="suggested-grid"></div>'); 
    const section = htmlToElement(sectionHTML);
    let suggesteds : Pair[] = [];
    while (suggesteds.length < 6){
        let rand = Math.floor(Math.random() * songs.length);
        let rand2 = Math.floor(Math.random() * songs[rand].musics.length);
        let newPair : Pair= {
            n1 : rand,
            n2 : rand2
        } 
        if ( !contains(suggesteds, newPair)){
            suggesteds.push(newPair);
            suggestedsPlaylist.push(songs[rand].musics[rand2]);
            gridContainer.appendChild(createSuggestedItem(songs[rand].musics[rand2]))
        }
    }
    section.appendChild(gridContainer);
    return section;
}

function contains (list : Pair[], target : Pair) : boolean{
    for ( let pair of list){
        if ( pair.n1 == target.n1 && pair.n2 == target.n2){
            return true;
        }
    }
    return false;
}

function createSuggestedItem (song : Music){
    let songThumb : string = song.track_thumb;
    if (songThumb == null || songThumb == ""){
         songThumb = "../public/pics/no_cover.jpg";
    }
    let html = `
    <div id = "${"s" +  song.id}"class="grid-item">
        <img loading="lazy" class="suggested-item__pic" src="${songThumb}" alt="">
        <p class="suggested-item__name">${song.track_name}</p>
    </div>
    `;
    let element : HTMLScriptElement = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(createHomePage);
        createPlayPage (suggestedsPlaylist, suggestedsPlaylist.indexOf(song), false);
    })
    return element;
}



function createRecentlyItem(song : Music, index : number){
    let html = `<div id = "${song.id}" class="recently-played__item">
    <img loading="lazy" class="recently-played__item-img" src="${song.track_thumb}" alt="">
    <p class="recently-played__item-name">${song.track_name}</p>
    </div>`;
    let element : HTMLScriptElement = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(createHomePage);
        createPlayPage(recentlyPlayed.slice(0, 15), index, false)
    })
    return element;
}

function createRecentlySection (songs : Root){
    // just for test 
    let sectionHTML = `<section class="main-container__recently-played home__section">
    <h2 class="section-header">Recently Played</h2>
    </section> `;
    let container = htmlToElement(`<div id="recently-played__content-container" class="scroll-container">
    </div>`);
    let counter = 0;
    for (let item of recentlyPlayed){
        container.appendChild(createRecentlyItem(item, counter));
        counter++;
        if (counter == 7){
            break;
        }
    }
    let section = htmlToElement(sectionHTML);
    section.appendChild(container);
    return section;
}

function createNewReleasesItem (song : Album){
    let songThumb : string = song.album_thumb;
    if (songThumb == null || songThumb == ""){
         songThumb = "../public/pics/no_cover.jpg";
    }
    let html = `<div id = "${song.id}" class="new-releases__item">
    <img loading="lazy" class="new-releases__item-pic" src="${songThumb}" alt="">
    </div>`;
    let element : HTMLScriptElement = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(createHomePage);
        createAlbumPage(getAlbumData(element.id)!);
    })
    return element;
}

export function getAlbumData (id : string) : Root2 | null{
    for (let data of songs){
        if (data.album.id == id){
            return data;
        }
    }
    return null;
}

function createNewReleasesSection (songs : Root){
    let sectionHTML = `<section class="main-container__new-releases home__section">
    <h2 class="section-header">New Releases</h2>
    </section>  `;
    let gridContainer = htmlToElement(`<div id="new-releases__content-container" class="scroll-container new-releases">
    </div>`);
    for ( let i = 0 ; i < 6 ; i++){
        gridContainer.appendChild(createNewReleasesItem(songs[i].album));
    }
    let section = htmlToElement(sectionHTML);
    section.appendChild(gridContainer);
    return section;
}

function createMainBody(){
    let html = `<div id = "main-body" class="main-body"></div>`;
    document.getElementById('view-point')?.appendChild(htmlToElement(html));
}


export function createHomePage (){
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.remove('library-main-body');
    body.classList.remove('album-main-body');
    body.appendChild(createSuggestedSection(songs));
    body.appendChild(createRecentlySection(songs));
    body.appendChild(createNewReleasesSection(songs));
    setDefaultColor();
}

export function setup (){
    createMainBody();
    createMiniPlayerContainer();
    createNavbar();
    createHomePage();
    setNavbarLocating();
}

function createMiniPlayerContainer() {
    let html = `<div id = "mini-player-container" class="mini-player-container"></div>`;
    document.getElementById('view-point')?.appendChild(htmlToElement(html));
}

export function getAverageRgb(src : string) {
    var context = document.createElement('canvas').getContext('2d')!;
    let image = new Image;
    image.setAttribute('crossOrigin', ''); 
    image.src = src;
    context.imageSmoothingEnabled = true;
    context.drawImage(image, 0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data.slice(0,3);
}

export function setRequestedColor (src : string){
    //let input = getAverageRgb(src);
    getAverageRGB(src);

}

function getAverageRGB(src : string) {
    let imgEl = document.createElement('img');
    imgEl.src = src;
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    console.log('hi');
    let rt = document.documentElement;
    let color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    rt.style.setProperty("--selected-text-color", color);

}

export function setDefaultColor (){
    let rt = document.documentElement;
    rt.style.setProperty("--selected-text-color", 'rgb(0, 107, 18)');
}