export type Root = Root2[]

export interface Root2 {
  album: Album
  musics: Music[]
  length: number
}

export interface Album {
  id: string
  album_name: string
  album_composer: string
  album_genre: string
  album_thumb: string
  album_url: string
}

export interface Music {
  id: any
  track_name: string
  track_time: string
  track_url: string
  track_thumb: string
  is_favorited: number
  like_status: any
  nonce: string
}