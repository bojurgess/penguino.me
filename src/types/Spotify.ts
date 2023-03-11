export namespace Spotify {
    export interface Context {
        external_urls: {
          spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    }

    export interface Album {
        album_type: string;
        artists: Artist[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          height: number;
          url: string;
          width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    }

    export interface Artist {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }

    export interface Item {
        album: Album;
        artists: Artist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string | null;
        track_number: number;
        type: string;
        uri: string;
    }

    export interface CurrentlyPlaying {
        context: Context | null;
        currently_playing_type: string;
        is_playing: boolean;
        item: Item | null;
        progress_ms: number | null;
        repeat_state: 'off' | 'track' | 'context';
        shuffle_state: boolean;
        timestamp: number;
    }
}

export {}