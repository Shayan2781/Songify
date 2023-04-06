import { Album, Music, Root, Root2 } from "../data/SongFormatter";
import { htmlToElement, setRequestedColor } from "./HomeComponents";
import songs from '../data/songs.json';
import { createPlayPage, getSongIndex } from "./PlayComponents";
import { addToLikedAlbums, addToLikedArtists, addToRout, getRout, isAlbumLiked, likedArtists, removeFromLikedAlbums, removeFromLikedArtists } from "..";

let selectedAlbum : Root2;
let selectedArtist : string;


function createExitSection (previousData? : any){
    let html = `<section class="exit-section">
    </section>`;
    let iconHTML = `<i id="exit-info-page" class="fa fa-angle-left"></i>`;
    let iconElement = htmlToElement(iconHTML);
    iconElement.addEventListener('click', function(){
        let func : Function = getRout();
        func();
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function createHeaderSection (album : Album){
    let html = `<section class="header-section">
    <img class="header-section__img-album" src="${album.album_thumb}" alt="">
    </section>`;
    let iconHTML = `<i class="fa fa-play-circle play-icon"></i>`;
    let iconElement = htmlToElement(iconHTML);
    iconElement.addEventListener('click', function(){
        addToRout(createAlbumPage);
        createPlayPage(getAlbumSongs(album.id)!, 0, false);
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function getAlbumSongs (album : string){
    for ( let song of songs){
        if ( song.album.id == album){
            return song.musics;
        }
    }
    return null;
}

function createArtistHeaderSection (name : string, data : Root){
    let pic = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
    let html = `<section class="header-section">
    <img class="header-section__img" src="${pic}" alt="">
    </section>`;
    let iconHTML = `<i class="fa fa-play-circle play-icon"></i>`;
    let iconElement = htmlToElement(iconHTML);
    iconElement.addEventListener('click', function(){
        addToRout(createArtistPage);
        createPlayPage(findArtistMusics(data, name), 0, false);
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function createNameSection (album : Album){
    let html = `<section class="name-section">
    <div>
        <h2 class="album-name">${album.album_name}</h2>
        <h2 class="album-composer">${album.album_composer}</h2>
    </div>
    </section>`;
    let iconHTML = `<i class="fa fa-heart like-album"></i>`;
    let iconElement = htmlToElement(iconHTML);
    if ( isAlbumLiked(album)){
        iconElement.classList.add('button-clicked');
    }
    iconElement.addEventListener('click', function(){
        if ( iconElement.classList.contains('button-clicked')){
            removeFromLikedAlbums(album);
        }
        else{
            addToLikedAlbums(album);
        }
        iconElement.classList.toggle('button-clicked')
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function createArtistNameSection (name : string){
    let html = `<section class="name-section">
    <div>
        <h2 class="album-name">${name}</h2>
        <h2 class="album-composer">Artist</h2>
    </div>
    </section>`;
    let iconHTML = `<i class="fa fa-heart like-album"></i>`;
    let iconElement = htmlToElement(iconHTML);
    if ( likedArtists.includes(name)){
        iconElement.classList.add('button-clicked');
    }
    iconElement.addEventListener('click', function(){
        if ( iconElement.classList.contains('button-clicked')){
            removeFromLikedArtists(name);
        }
        else{
            addToLikedArtists(name);
        }
        iconElement.classList.toggle('button-clicked')
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function createSongListSection (albumTracks : Music[]){
    let html = `<section class="songs-list-section"></section>`;
    let sectionElement = htmlToElement(html);
    for ( let song of albumTracks){
        sectionElement.appendChild(createSongListItem(albumTracks, song));
    }
    return sectionElement;
}

function createArtistSongListSection (albumTracks : Music[]){
    let html = `<section class="songs-list-section"></section>`;
    let sectionElement = htmlToElement(html);
    for ( let song of albumTracks){
        sectionElement.appendChild(createSongListItem(albumTracks ,song));
    }
    return sectionElement;
}

function findArtistMusics (data : Root, artist : string){
    let results : Music[] = []; 
    for ( let album of data){
        if ( album.album.album_composer === artist){
            results = results.concat(album.musics);
        }
    }
    return results;

}

function createSongListItem (songs : Music[], song : Music){
    let html = `<div class="list__item">
    <img class="list__item__img" src="${song.track_thumb}" alt="">
    <p class="list__item__name">${song.track_name}</p>
    </div>`;
    let itemElement = htmlToElement(html);
    itemElement.addEventListener('click', function(){
        addToRout(createAlbumPage)
        createPlayPage(songs, getSongIndex(songs, song)!, false);
    });
    return itemElement;
}

export function createAlbumPage (data? : Root2) {
    if ( data != null){
        selectedAlbum = data;
    }
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.remove('library-main-body');
    body.classList.add('album-main-body');
    body.appendChild(createExitSection());
    body.appendChild(createHeaderSection(selectedAlbum.album));
    body.appendChild(createNameSection(selectedAlbum.album));
    body.appendChild(createSongListSection(selectedAlbum.musics));
    setRequestedColor(selectedAlbum.album.album_thumb);
}

export function createArtistPage (data? : string) {
    if ( data != null){
        selectedArtist = data;
    }
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.remove('library-main-body');
    body.classList.add('album-main-body');
    body.appendChild(createExitSection());
    body.appendChild(createArtistHeaderSection(selectedArtist, songs));
    body.appendChild(createArtistNameSection(selectedArtist));
    body.appendChild(createArtistSongListSection(findArtistMusics(songs, selectedArtist)));
}

