export interface NowPlayingResponse {
    is_playing: boolean;
    item? : Item;
    progress_ms: number;
}

interface Item {
    album: Album;
    artists: Artist[];
    duration_ms: number;
    name: string;
    uri: string;
}

interface Album {
    images: Image[];
    name: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface Artist {
    name: string;
    uri: string;
}
