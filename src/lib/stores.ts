import { writable } from 'svelte/store'
import { fetchData } from './utils/fetchData';
import { getProgressInfo, getProgressPercentage } from './utils/progressUtils';
import type { Spotify } from '../types/Spotify'
import type { ProgressInfo } from '../types/ProgressInfo';

let NowPlaying: Spotify.CurrentlyPlaying;
let Progress: ProgressInfo;

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

export function createProgressData() {
    const { subscribe, set, update } = writable(Progress)

    function increment(data: ProgressInfo, value: number): ProgressInfo {
        return {
            progress_ms: value,
            duration_ms: data.duration_ms,
            progress_percent: getProgressPercentage(value, data.duration_ms),
            is_playing: data.is_playing,
            currently_playing_type: data.currently_playing_type
        }
    }

    return {
        subscribe,
        set: (value: Spotify.CurrentlyPlaying) => {
            set(getProgressInfo(value))
        },
        increment: (data: ProgressInfo, value: number) => {
            set(increment(data, value))
        },
        refresh: async () => {
            await CurrentlyPlaying.refresh()

            CurrentlyPlaying.subscribe(value => {
                set(getProgressInfo(value))
            })
        }
    }
}

export const CurrentlyPlaying = createCurrentlyPlaying()
export const ProgressData = createProgressData()