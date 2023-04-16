import { Album, Music } from '../data/SongFormatter';
import { htmlToElement, setDefaultColor } from "./HomeComponents";
import { createSearchResultAlbumItem, createSearchResultArtistItem, createSearchResultSongItem, setResultsEmpty } from "./SearchComponents";
import { likedAlbums, likedArtists, likedSongs } from '..';

let category : string = 'songs';

function createHeaderSection (){
    let html = `<section class="type-section">
    <h2 class="section-main-header">Library</h2>
    </section>`;
    return htmlToElement(html);
}


function createCategory (){
    let html = `<section class="categories-section">
    <p class="category-label">Songs</p>
    <p class="category-label">Artists</p>
    <p class="category-label">Albums</p>
    </section>`;
    return htmlToElement(html);
}

function categoryFunctionality (){
    let categories = document.querySelectorAll('.category-label');
    if ( category == 'songs'){
        categories[0].classList.add('selected-category');
    }
    else if ( category == 'artists'){
        categories[1].classList.add('selected-category');
    }
    else{
        categories[2].classList.add('selected-category');
    }
    categories[0].addEventListener('click', function(){
        category = 'songs';
        categories[0].classList.add('selected-category');
        categories[1].classList.remove('selected-category');
        categories[2].classList.remove('selected-category');
        getAllItems()
    });
    categories[1].addEventListener('click', function(){
        category = 'artists';
        categories[1].classList.add('selected-category');
        categories[0].classList.remove('selected-category');
        categories[2].classList.remove('selected-category');
        getAllItems();
    });
    categories[2].addEventListener('click', function(){
        category = 'albums';
        categories[2].classList.add('selected-category');
        categories[1].classList.remove('selected-category');
        categories[0].classList.remove('selected-category');
        getAllItems();
    });
    setResultsEmpty('library-result-section');
    
}

function createSearchSection (){
    let sectionHTML = `<section class="search-section-search">
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
        if ( inputText == ""){
            getAllItems();
            return
        }
        getSearchResults(inputText);

    });
    inputElement.appendChild(field);
    let sectionElement = htmlToElement(sectionHTML);
    sectionElement.appendChild(inputElement);
    return sectionElement;
}

function getAllItems (){
    let resultSection = document.getElementById('library-result-section');
    resultSection!.innerHTML = '';
    if ( category == 'artists'){
        let result : string[] = likedArtists;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            resultSection?.appendChild(createSearchResultArtistItem(item, createLibraryPage));
        }

    }
    else if ( category == 'songs'){
        let result : Music[] = likedSongs;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            resultSection?.appendChild(createSearchResultSongItem(item, likedSongs, createLibraryPage));
        }
    }
    else{
        let result : Album[] = likedAlbums;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            resultSection?.appendChild(createSearchResultAlbumItem(item, createLibraryPage));
        }
    }

}

function getSearchResults (input : string){
    let resultSection = document.getElementById('library-result-section');
    resultSection!.innerHTML = "";
    input = input.toLowerCase();
    if ( category == 'artists'){
        let result : string[] = likedArtists;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            if ( item.toLowerCase().includes(input)){
                resultSection?.appendChild(createSearchResultArtistItem(item, createLibraryPage));
            }
        }
    }
    else if ( category == 'songs'){
        let result : Music[] = likedSongs;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            if ( item.track_name.toLowerCase().includes(input)){
                resultSection?.appendChild(createSearchResultSongItem(item, result, createLibraryPage));
            }
        }
    }
    else{
        let result : Album[] = likedAlbums;
        if ( result.length == 0){
            setResultsEmpty('library-result-section');
            return;
        }
        resultSection?.classList.remove('empty-result-section');
        for ( let item of result){
            if ( item.album_name.toLowerCase().includes(input)){
                resultSection?.appendChild(createSearchResultAlbumItem(item, createLibraryPage));
            }
        }
    }
    
}


function createResultSection(){
    let html = `<section id="library-result-section" class="result-section empty-result-section" class="fa fa-music no-result"></i> </section>`;
    return htmlToElement(html);
}

export function createLibraryPage (){
    history.pushState('', 'Library', '/library');
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.add('library-main-body');
    body.classList.remove('album-main-body');
    body.appendChild(createHeaderSection());
    body.appendChild(createCategory());
    body.appendChild(createSearchSection());
    body.appendChild(createResultSection());
    categoryFunctionality();
    getAllItems();
    setDefaultColor();
}
