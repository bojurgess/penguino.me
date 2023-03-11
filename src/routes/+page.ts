/** @type {import('./$types').PageLoad} */
import { CurrentlyPlaying } from '$lib/stores'

export async function load() {
    await CurrentlyPlaying.refresh()
    return {}
}