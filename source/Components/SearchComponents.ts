import { Album } from '../data/SongFormatter';
import { Music } from "../data/SongFormatter";
import { getAlbumData, htmlToElement, setDefaultColor } from "./HomeComponents";
import songs from '../data/songs.json'
import { createAlbumPage, createArtistPage } from './AlbumPageComponents';
import { createPlayPage, getSongIndex } from './PlayComponents';
import { addToRout, removeDuplicate } from '..';


let searchedInput = "";
class SearchResults {
    artists : string[];
    albums : Album[];
    musics : Music[];

    constructor (){
        this.artists = [];
        this.albums = [];
        this.musics = [];
    }
}

export function createSearchSection (){
    let sectionHTML = `<section class="search-section-search">
    <h2 class="section-main-header">Search</h2>
    </section>`;
    let inputHTML = `<div class="search-container">
    <i class="fa fa-search search-icon"></i>
    </div>`;
    let inputElement  = htmlToElement(inputHTML);
    let field = document.createElement('input');
    field.id = "search-field";
    field.type = "text";
    field.placeholder = "Search...";
    field.autocomplete = "off";
    field.addEventListener('keyup', function(){
        let inputText = field.value;
        searchedInput = inputText
        if ( inputText == ""){
            setResultsEmpty("search-result-section");
            return
        }
        createResultList(getSearchResults(inputText));
    });
    inputElement.appendChild(field);
    let sectionElement = htmlToElement(sectionHTML);
    sectionElement.appendChild(inputElement);
    return sectionElement;
}

export function setResultsEmpty (id : string){
    const resultSection = document.getElementById(id);
    resultSection!.innerHTML = '';
    resultSection?.classList.add('empty-result-section');
    let html = `<i id="no-search-results" class="fa fa-music no-result"></i> `;
    resultSection?.appendChild(htmlToElement(html));

}

export function createSearchResultSongItem (song : Music, list : Music[], callBack : Function){
    let html = `<div id = "${song.id}" class="result-item">
    <img class="result-pic" loading="lazy" src="${song.track_thumb}" alt="">
    <p class="result-name" >${song.track_name}</p>
    </div>`;
    let element = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(callBack)
        createPlayPage(list, getSongIndex(list, song)!, false);
    });
    return element;
}



export function createSearchResultAlbumItem (album : Album, callBack : Function){
    let html = `<div class="result-item">
    <img class="result-pic" loading="lazy" src="${album.album_thumb}" alt="">
    <div class="name-holder">
        <p class="result-name" >${album.album_name}</p>
        <p class="result-indicator">Album</p>
    </div>
    </div>`;
    let element = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(callBack);
        createAlbumPage(getAlbumData(album.id)!);
    });
    return element;
}
export function createSearchResultArtistItem (artist : string, callBack : Function){
    let html = `<div class="result-item">
    <img class="result-pic artist" loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="">
    <div class="name-holder">
        <p class="result-name" >${artist}</p>
        <p class="result-indicator">Artist</p>
    </div>
    </div>`;
    let element = htmlToElement(html);
    element.addEventListener('click', function(){
        addToRout(callBack);
        createArtistPage(artist);
    });
    return element;
}

export function getSearchResults (input : string){
    let results = new SearchResults();
    input = input.toLowerCase();
    for (let song of songs){
        if ( song.album.album_name.toLowerCase().includes(input)){
            results.albums.push(song.album)
        }
        for(let music of song.musics){
            if ( music.track_name.toLowerCase().includes(input)){
                results.musics.push(music)
            }
        }
        if (song.album.album_composer.toLowerCase().includes(input) && !results.artists.includes(song.album.album_composer)){
            results.artists.push(song.album.album_composer);
        }
    }
    return results;
}

function createResultList (results : SearchResults){
    const resultSection = document.getElementById('search-result-section');
    resultSection!.innerHTML = '';
    if ( results.albums.length == 0 && results.artists.length == 0 && results.musics.length == 0){
        setResultsEmpty("search-result-section");
        return;
    }
    resultSection?.classList.remove('empty-result-section');
    for ( let artist of results.artists){
        resultSection?.appendChild(createSearchResultArtistItem(artist, createSearchPage));
    }
    for ( let album of results.albums){
        resultSection?.appendChild(createSearchResultAlbumItem(album, createSearchPage));
    }
    for ( let music of results.musics){
        resultSection?.appendChild(createSearchResultSongItem(music, [music], createSearchPage));
    }
}

function createResultSection(){
    let html = `<section id="search-result-section" class="result-section empty-result-section"><i id="no-search-results" class="fa fa-music no-result"></i> </section>`;
    return htmlToElement(html);
}

export function createSearchPage (searched :string = ""){
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.remove('album-main-body');
    body.classList.remove('library-main-body');
    body.appendChild(createSearchSection());
    body.appendChild(createResultSection());
    if ( searchedInput == ""){
        setResultsEmpty("search-result-section");
    }
    else{
        let field = <HTMLInputElement>document.getElementById('search-field');
        field.value = searchedInput;
        createResultList(getSearchResults(searchedInput));
    }
    setDefaultColor();
}

