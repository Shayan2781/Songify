import { Artist } from './data/UserDataFormatter';
import songs from './data/songs.json';
import { createHomePage, getAverageRgb, htmlToElement, setRequestedColor } from "./Components/HomeComponents";
import { createSearchPage } from './Components/SearchComponents';
import { setup } from './Components/HomeComponents';
import { createPlayPage } from './Components/PlayComponents';
import { Album, Music, Root2 } from './data/SongFormatter';

export let recentlyPlayed : Music[] = [];
export let likedSongs : Music[] = [];
export let likedArtists : string[] = [];
export let likedAlbums : Album[] = [];

export let routingTracked : Function[] = [];

/******* Default setup for test *******/

addToRecentlyPlayed(songs[2].musics[0]);
addToRecentlyPlayed(songs[7].musics[1]);
addToRecentlyPlayed(songs[14].musics[0]);
addToRecentlyPlayed(songs[4].musics[1]);

addToLikedSongs(songs[2].musics[0]);
addToLikedSongs(songs[9].musics[3]);
addToLikedSongs(songs[12].musics[1]);

addToLikedArtists(songs[0].album.album_composer);
addToLikedArtists(songs[1].album.album_composer);
addToLikedArtists(songs[2].album.album_composer);
addToLikedArtists(songs[3].album.album_composer);

addToLikedAlbums(songs[3].album);
addToLikedAlbums(songs[7].album);
addToLikedAlbums(songs[9].album);
addToLikedAlbums(songs[2].album);
addToLikedAlbums(songs[1].album);



setup();

let recently : Array<string> = [];

export function isAlbumLiked (album : Album){
    for ( let item of likedAlbums){
        if ( item.id == album.id){
            return true;
        }
    }
    return false
}

export function addToRecentlyPlayed (song : Music){
    removeDuplicate(recentlyPlayed, song);
    recentlyPlayed.unshift(song);
}

export function addToLikedSongs (song : Music){
    likedSongs.unshift(song);
}

export function removeFromLikedSongs (song : Music){
    let index = 0;
    for ( let item of likedSongs){
        if ( item.id == song.id){
            break;
        }
        index++;
    }
    likedSongs.splice(index, 1);
}

export function addToLikedAlbums (song : Album){
    likedAlbums.unshift(song);
}

export function removeFromLikedAlbums (song : Album){
    let index = 0;
    for ( let item of likedAlbums){
        if ( item.id == song.id){
            break;
        }
        index++;
    }
    likedAlbums.splice(index, 1);
}

export function addToLikedArtists (artist : string){
    likedArtists.unshift(artist);
}

export function removeFromLikedArtists (artist : string){
    let index = 0;
    for ( let item of likedArtists){
        if ( item == artist){
            break;
        }
        index++;
    }
    likedArtists.splice(index, 1);
}

export function removeDuplicate (list : Music[], song : Music){
    let index = 0;
    for ( let item of list){
        if ( item.id == song.id){
            break;
        }
        index++;
    }
    list.splice(index, 1);
}

export function addToRout (func : Function){
    routingTracked.push(func);
}

export function getRout () : Function{
    let func = routingTracked.pop();
    return func!;
}








