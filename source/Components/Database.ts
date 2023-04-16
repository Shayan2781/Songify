import { Music } from "../data/SongFormatter";

let dbVersion = 2;
let objStore = "songsList"

export async function getSongDB ( song : string){

    return new Promise(function(resolve){
        const request = indexedDB.open('SongsDatabase', dbVersion);
        request.onerror = function (event){
            console.log('failed to open db to get song');
            console.error(event);
            return null;
        }
        request.onupgradeneeded = function(){
            console.log('createdDB');
            const db = request.result;
            const store = db.createObjectStore(objStore);
        }
        request.onsuccess = async function(){
            const db = request.result;
            console.log("openedDB");
            const transaction = db.transaction(objStore, "readonly");
            const store = transaction.objectStore(objStore);
            const idQuery = store.get(song);
            
            
            idQuery.onsuccess =  function(){
                let res = null;
                let idQueryResult =  idQuery.result;
                if ( idQueryResult == undefined || idQueryResult == null){
                    return resolve(null);
                }
                let URL = window.URL || window.webkitURL;
                res = URL.createObjectURL(idQueryResult);
                console.log(idQuery.result);
                console.log(res);
                return resolve(res);
            }
            idQuery.onerror = function(){
                return resolve(null);
            }
            transaction.oncomplete = function(){
                db.close();
            }
        }
    });
}


export function saveSongDB (song : Music){
    let xhr = new XMLHttpRequest(),blob;
    xhr.open("GET", song.track_url, true);
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            console.log("Image retrieved");
            blob = xhr.response;
            console.log("Blob:" + blob);

            // Put the received blob into IndexedDB
            putSongInDB(blob, (song.id + ""));
        }
    }, false);
    xhr.send();

}

export function putSongInDB (blob : any, songID : string){
    const request = indexedDB.open('SongsDatabase', dbVersion);
    request.onerror = function (event){
        console.log('failed to open db to get song');
        console.error(event);
    }
    request.onupgradeneeded = function(){
        const db = request.result;
        const store = db.createObjectStore(objStore);
        store.createIndex("data", "url");
    }
    request.onsuccess = function(){
        const db = request.result;
        const transaction = db.transaction(objStore, "readwrite");
        const store = transaction.objectStore(objStore);
        store.put(blob, songID);
        console.log("Saved " + blob + "--" + songID);
        transaction.oncomplete = function(){
            db.close;
        }
        
    }
}
