import { addToLikedSongs, addToRecentlyPlayed, addToRout, getRout, likedSongs, removeFromLikedSongs } from "..";
import { Music } from "../data/SongFormatter";
import { getSongDB, saveSongDB } from "./Database";
import { htmlToElement, setRequestedColor } from "./HomeComponents";


let isRandomized : boolean;
let isLooped : boolean = false;
let isMinimized : boolean = false;

function createHeadingSection (givenSongs : Music[]){
    let html = `<section class="heading">
    </section>`;
    let iconElement = htmlToElement('<i class="fa fa-angle-down go-back"></i>');
    iconElement.addEventListener('click', function(){
        let func : Function = getRout();
        func();
        isMinimized = true;
        createMiniPlayer(givenSongs, currSong, isRandomized);
    });
    let sectionElement = htmlToElement(html);
    sectionElement.appendChild(iconElement);
    return sectionElement;
}

function createSongImgSection (songs : Music[]){
    let currIndex = currSong;
    let html = `<section class="song-img-section">
    </section>`;
    let sectionElement = htmlToElement(html);
    let nextIndex = (currIndex + 1) % songs.length;
    let prevIndex = (currIndex - 1) % songs.length;
    if ( prevIndex < 0){
        prevIndex = songs.length - 1;
    }
    let img1 = htmlToElement(`<img class="side-song-img prev-song-img" src="${songs[prevIndex].track_thumb}" alt="">`);
    let img2 = htmlToElement(`<img class="current-song-img" src="${songs[currIndex].track_thumb}" alt="">`);
    let img3 = htmlToElement(`<img class="side-song-img next-song-img" src="${songs[nextIndex].track_thumb}" alt="">`);

    let prevButton = htmlToElement('<i class="fa fa-angle-left img-icon"></i>');
    prevButton.addEventListener('click', function(){
        let nextIndex;
        currTrack!.pause()
        currTrack = null
        if ( isRandomized){
            nextIndex = getRandomized(songs.length, currIndex);
        }
        else{
            nextIndex = (currIndex - 1) % songs.length;
            if ( nextIndex < 0){
                nextIndex = songs.length - 1;
            }
        }
        createPlayPage(songs, nextIndex, isRandomized);
    });

    let nextButton = htmlToElement('<i class="fa fa-angle-right img-icon"></i>');
    nextButton.addEventListener('click', function(){
        let nextIndex;
        currTrack!.pause()
        currTrack = null;
        if ( isRandomized){
            nextIndex = getRandomized(songs.length, currIndex);
        }
        else{
            nextIndex = (currIndex + 1) % songs.length;
        }
        createPlayPage(songs, nextIndex, isRandomized);
    });
    sectionElement.appendChild(prevButton);
    sectionElement.appendChild(img1);
    sectionElement.appendChild(img2);
    sectionElement.appendChild(img3);
    sectionElement.appendChild(nextButton);

    return sectionElement;
}

function getRandomized (max : number, current : number){
    let rand : number;
    while(true){
        rand = Math.floor(Math.random() * max);
        if ( rand != current){
            break;
        }
    }
    return rand;
}


function createControlsSection (song : Music){
    let html = `<section class="controls">
    </section>`;
    let sectionElement = htmlToElement(html);


    let nameLikeHTML = `<div class="name-like">
    <div class="song-info">
        <p id="song-name">${song.track_name}</p>
    </div>
    </div>`;
    let likeSongButton = htmlToElement('<i class="like-icon fa fa-heart"></i>');
    if ( isLiked(song)){
        likeSongButton.classList.add('button-clicked');
    }
    likeSongButton.addEventListener('click', function(){
        if ( likeSongButton.classList.contains('button-clicked')){
            removeFromLikedSongs(song);
        }
        else{
            addToLikedSongs(song);
        }
        likeSongButton.classList.toggle('button-clicked');
    })
    let nameLikeElement = htmlToElement(nameLikeHTML);
    nameLikeElement.appendChild(likeSongButton);
    sectionElement.appendChild(nameLikeElement);


    let songLenHTML = `<div class="song-len">
    <div id ="current-time">00:00</div>
    <input id = "music-len-slider" type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()" >
    <div id = "max-time">${song.track_time}</div>
    </div>`;
    let songLenElement = htmlToElement(songLenHTML);
    sectionElement.appendChild(songLenElement);


    let controlsHTML = `<div class="control-buttons">
    </div>`;
    let controlsElement = htmlToElement(controlsHTML);
    let randomButton = htmlToElement('<i class="fa fa-random"></i>');
    randomButton.addEventListener('click', function(){
        if ( isRandomized){
            isRandomized = false;
        }
        else{
            isRandomized = true;
        }
        randomButton.classList.toggle('button-clicked');
    });
    if ( isRandomized){
        randomButton.classList.add('button-clicked');
    }

    controlsElement.appendChild(randomButton);
    let backwardButton = htmlToElement('<i class="fa fa-backward"></i>');
    let playButton = htmlToElement('<i id="play-pause" class="fa fa-pause"></i>');
    let forwardButton = htmlToElement('<i class="fa fa-forward"></i>');
    let buttonWrapper = htmlToElement('<div class="main-controls"></div>');
    backwardButton.addEventListener('click', function(){
        currTrack!.currentTime -= 10;
    });
    playButton.addEventListener('click', function(){
        if ( currTrack!.paused){
            currTrack!.play();
            playButton.classList.add('fa-pause');
            playButton.classList.remove('fa-play');

        }
        else if ( currTrack!.played){
            currTrack!.pause()
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        }
    });
    forwardButton.addEventListener('click', function(){
        currTrack!.currentTime += 10
    });
    buttonWrapper.appendChild(backwardButton);
    buttonWrapper.appendChild(playButton);
    buttonWrapper.appendChild(forwardButton);
    controlsElement.appendChild(buttonWrapper);
    let loopButton = htmlToElement('<i class="fa fa-repeat"></i>');
    loopButton.addEventListener('click', function(){
        if ( isLooped){
            isLooped = false;
        }
        else{
            isLooped = true;
        }
        loopButton.classList.toggle('button-clicked');
        loopButton.classList.toggle('rotate');
    });
    controlsElement.appendChild(loopButton);
    sectionElement.appendChild(controlsElement);
    return sectionElement;
}

function setSliderFunction (){
    let slider = <HTMLInputElement>document.getElementById('music-len-slider')!;
    slider.onchange = seekTo;
}

function createPlaylistSection (song : Music[]){
    let sectionElement = htmlToElement(`<section class="playlist-section"></section>`);
    for ( let i = 0 ; i < song.length ; i++){
        if ( i == currSong){
            sectionElement.appendChild(createSongListItem(song, song[i], true));
        }
        else{
            sectionElement.appendChild(createSongListItem(song, song[i], false));
        }
    } 
    return sectionElement;
}

function createSongListItem (songs : Music[], song : Music, isPlaying : boolean){
    let html = `<div class="list__item">
    <img class="list__item__img" src="${song.track_thumb}" alt="">
    <p class="list__item__name">${song.track_name}</p>
    </div>`;

    if ( isPlaying){
        html = `<div class="list__item is-playing">
        <img class="list__item__img" src="${song.track_thumb}" alt="">
        <p class="list__item__name">${song.track_name}</p>
        </div>`;
    }

    let itemElement = htmlToElement(html);
    itemElement.addEventListener('click', function(){
        stopSong();
        createPlayPage(songs, getSongIndex(songs, song)!, isRandomized);
    });
    return itemElement;
}

export function getSongIndex (songs : Music[], song : Music){
    let counter = 0;
    for ( let item of songs){
        if ( item.id == song.id){
            return counter
        }
        counter++;
    }

}

let currSong = 0;
let currTrack! : HTMLAudioElement | null;
let timer: number | undefined;


async function loadTrack(givenSongs : Music[] , index : number){
    clearInterval(timer);
    reset()
    currTrack! = document.createElement('audio');
    currTrack!.src = givenSongs[index].track_url;
    let songFromDB : string = <string>await getSongDB(givenSongs[index].id + "");
    console.log(songFromDB);
    if ( songFromDB){
        currTrack!.src = songFromDB;
        console.log("got from db");
    }
    else{
        currTrack!.load();
        saveSongDB(givenSongs[index]);
    }

    timer = setInterval(setUpdate, 1000);

    currTrack!.addEventListener('ended', function(){
        nextTrack(givenSongs);
    });
    currTrack!.play()
}

function seekTo(){
    let slider = <HTMLInputElement>document.getElementById('music-len-slider')!;
    let seekto = currTrack!.duration *  (parseInt(slider.value) / 100);
    currTrack!.currentTime = seekto;
}

function setUpdate (){
    let slider = <HTMLInputElement>document.getElementById('music-len-slider')!;
    let seekPosition = 0;
    if (slider == null || slider == undefined || currTrack! == null || currTrack! == undefined){
        return;
    }
    if(!isNaN(currTrack!.duration)){
        seekPosition = currTrack!.currentTime * (100 / currTrack!.duration);
        slider.value = seekPosition + "";

        let currentMinutes : number | string = Math.floor(currTrack!.currentTime / 60);
        let currentSeconds : number | string= Math.floor(currTrack!.currentTime - currentMinutes * 60);


        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }


        let currTime = document.getElementById('current-time');
        currTime!.textContent = currentMinutes + ":" + currentSeconds;
    }
}

function reset(){
    let currTime = document.getElementById('current-time');
    if ( currTime == null || currTime == undefined){
        return;
    }
    currTime!.textContent = "00:00";
    let slider = <HTMLInputElement>document.getElementById('music-len-slider')!;
    slider.value = "0";
}

function nextTrack (songs : Music[]){
    let nextIndex;
    if ( isLooped){
        nextIndex = currSong;
        currTrack!.pause();
        loadTrack(songs, nextIndex);
        return;
    }
    if ( isRandomized){
        nextIndex = getRandomized(songs.length, currSong);
    }
    else{
        nextIndex = (currSong + 1) % songs.length;
    }
    currTrack!.pause();
    currTrack = null;
    if ( isMinimized){
        createMiniPlayer(songs, nextIndex, isRandomized);

        return;
    }
    createPlayPage(songs, nextIndex, isRandomized);
}

export function stopSong (){
    if (currTrack! == null || currTrack! == undefined){
        return;
    }
    if ( !currTrack!.paused){
        currTrack!.pause();
    }
    currTrack = null;
    
    clearInterval(timer);
}

function isLiked (song : Music) : boolean{
    for ( let item of likedSongs){
        if ( song.id == item.id){
            return true;
        }
    }
    return false;
}



export function createPlayPage(givenSongs : Music[] = [], current : number = 0, Randomized : boolean = false){
    history.replaceState('', 'Play', 'play#' + givenSongs[current].id);
    addToRecentlyPlayed(givenSongs[current]);
    isRandomized = Randomized;
    currSong = current;
    const body = document.getElementById('main-body')!;
    body.innerHTML = '';
    body.classList.remove('album-main-body');
    body.classList.remove('library-main-body');
    body.appendChild(createHeadingSection(givenSongs));
    body.appendChild(createSongImgSection(givenSongs));
    body.appendChild(createControlsSection(givenSongs[current]));
    body.appendChild(createPlaylistSection(givenSongs));
    if ( isMinimized){
        isMinimized = false;
        currTrack?.pause();
        currTrack = null
        let container = document.getElementById('mini-player-container');
        container!.innerHTML = "";
        loadTrack(givenSongs, currSong);
    }
    if ( currTrack == null){
        loadTrack(givenSongs, currSong);
    }
    setSliderFunction();
    setNavbarLocating(givenSongs);
}

export function createMiniPlayer (songs : Music[], current : number, Randomized : boolean){
    let currIndex = current;
    let container = document.getElementById('mini-player-container');
    container!.innerHTML = "";
    if ( currSong != currIndex){
        loadTrack(songs, currIndex)
        currSong = currIndex
        addToRecentlyPlayed(songs[currSong]);
    }
    let miniPlayerHTML = `<div class="mini-player">
    <img src="${songs[currSong].track_thumb}" class="mini-player__img" alt="">
    <p class="mini-player__name">${songs[currSong].track_name}</p>
    </div>`;
    let miniPlayerElement = htmlToElement(miniPlayerHTML);
    container!.style.setProperty('pointer-events', 'all');
    container?.append(miniPlayerElement);

    miniPlayerElement.firstElementChild!.addEventListener('click', function(){
        isMinimized = false;
        createPlayPage(songs, currIndex, isRandomized);
        container!.innerHTML = "";
        container!.style.setProperty('pointer-events', 'none');
    });
    miniPlayerElement.firstElementChild!.nextElementSibling!.addEventListener('click', function(){
        isMinimized = false;
        createPlayPage(songs, currIndex, isRandomized);
        container!.innerHTML = "";
        container!.style.setProperty('pointer-events', 'none');
    });

    let controllerContainerElement = htmlToElement('<div class="controllers-container"></div>');
    let backIcon = htmlToElement('<i class="fa fa-backward mini-player__controller"></i>');
    let pauseIcon = htmlToElement('<i class="fa mini-player__controller"></i>');
    pauseIcon.classList.add('fa-pause');
    let forwardIcon = htmlToElement('<i class="fa fa-forward mini-player__controller"></i>');
    let exitIcon = htmlToElement('<i class="fa fa-multiply mini-player__controller-exit"></i>');

    backIcon.addEventListener('click', function(){
        let nextIndex;
        currTrack!.pause()
        currTrack = null;
        if ( isRandomized){
            nextIndex = getRandomized(songs.length, currIndex);
        }
        else{
            nextIndex = (currIndex - 1) % songs.length;
            if ( nextIndex < 0){
                nextIndex = songs.length - 1;
            }
        }
        createMiniPlayer(songs, nextIndex, isRandomized);
    });

    pauseIcon.addEventListener('click', function(){
        if ( currTrack!.paused){
            currTrack!.play();
            pauseIcon.classList.add('fa-pause');
            pauseIcon.classList.remove('fa-play');

        }
        else if ( currTrack!.played){
            currTrack!.pause()
            pauseIcon.classList.remove('fa-pause');
            pauseIcon.classList.add('fa-play');
        }
    });

    forwardIcon.addEventListener('click', function(){
        let nextIndex;
        currTrack?.pause();
        currTrack = null;
        if ( isRandomized){
            nextIndex = getRandomized(songs.length, currIndex);
        }
        else{
            nextIndex = (currIndex + 1) % songs.length;
        }
        createMiniPlayer(songs, nextIndex, isRandomized);
    });

    exitIcon.addEventListener('click', function(){
        stopSong();
        container!.innerHTML = "";
        container!.style.setProperty('pointer-events', 'none');
    });
    controllerContainerElement.appendChild(backIcon);
    controllerContainerElement.appendChild(pauseIcon);
    controllerContainerElement.appendChild(forwardIcon);
    controllerContainerElement.appendChild(exitIcon);

    miniPlayerElement.appendChild(controllerContainerElement);
}

function setNavbarLocating (givenSongs : Music[]){
    let navs = document.querySelectorAll('.menu-item');
    for ( let item of navs){
        item.addEventListener('click', function(){
            if ( currTrack != null){
                isMinimized = true;
                createMiniPlayer(givenSongs, currSong, isRandomized);
            }
        });
    }
}
