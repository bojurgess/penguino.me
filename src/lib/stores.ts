import { writable } from 'svelte/store'
import { fetchData } from './utils/fetchData';
import type { Spotify } from '../types/Spotify'

let NowPlaying: Spotify.CurrentlyPlaying;

export function createCurrentlyPlaying() {
    const { subscribe, set, update } = writable(NowPlaying)

    return {
        subscribe,
        set: (value: Spotify.CurrentlyPlaying) => {
            set(value)
        },
        refresh: async () => {
            set(await fetchData({
                url: 'https://getnowplaying.penguinoo.workers.dev',
                query: new URLSearchParams({
                    user: 'beno',
                    market: 'US'
                })
            }))
        }
    }
}

const CurrentlyPlaying = createCurrentlyPlaying()