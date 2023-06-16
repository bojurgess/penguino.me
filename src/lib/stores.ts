import { writable } from 'svelte/store';
import type { NowPlayingResponse } from "$lib/types/NowPlayingResponse";

let NowPlayingResponse: NowPlayingResponse;

function createSpotifyStore() {
    const { subscribe, set, update } = writable(NowPlayingResponse);

    return {
        subscribe,
        init: async (fetch: any) => {
            const res = await fetch('https://getnowplaying.penguinoo.workers.dev' + '?market=US&user=beno')
            if (res.status === 200) {
                const data = await res.json();
                set(data);
            }
            else {
                const data: NowPlayingResponse = {
                    is_playing: false,
                    progress_ms: 0,
                }
                set(data);
            }
            return;
        },
        refresh: async () => {
            const res = await fetch('https://getnowplaying.penguinoo.workers.dev' + '?market=US&user=beno')
            if (res.status === 200) {
                const data = await res.json();
                set(data);
            }
            else {
                const data: NowPlayingResponse = {
                    is_playing: false,
                    progress_ms: 0,
                }
                set(data);
            }
            return;
        },
    }
}

export const SpotifyStore = createSpotifyStore();