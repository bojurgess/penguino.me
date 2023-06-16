<script lang="ts">
    import { SpotifyStore } from "$lib/stores";
	import { onMount } from "svelte";

    let progress: number = 0;
    let duration: number = 0;

    function updateProgress() {
        if ((progress += 1000) >= duration) {
            resetProgress();
        } else {
            // I literally have no idea why 1 works and 1000 doesn't but it does
            // progress += 1000 makes it skip a second
            progress += 1;
            setTimeout(updateProgress, 1000);
        }
    }

    async function resetProgress() {
        await SpotifyStore.refresh();
        progress = $SpotifyStore.progress_ms;
        duration = <number>$SpotifyStore.item?.duration_ms;
        updateProgress()
    };

    function checkInit() {
        if ($SpotifyStore) {
            progress = $SpotifyStore.progress_ms;
            duration = <number>$SpotifyStore.item?.duration_ms;
            updateProgress();
        } else {
            setTimeout(checkInit, 100);
        }
    }

    onMount(() => {
        checkInit();
    })
</script>

{#if $SpotifyStore}
    {#if $SpotifyStore.item}
    <div class="flex flex-col items-start">
        <section class="text-white font-semibold text-sm pb-2 flex justify-between w-full">
            <p>Listening To Spotify</p>
            <a href={$SpotifyStore.item.album.uri}><img src='https://cdn.simpleicons.org/spotify/ffffff' alt="Spotify Logo" class="w-4 h-4" /></a>
        </section>
        <section class="flex text-white">
            <img src={$SpotifyStore.item.album.images[0].url} alt="album cover" class="w-32 h-32 rounded-md" />
            <div class="pl-2">
                <a class="hover:underline" href={$SpotifyStore.item.uri}><h1>{$SpotifyStore.item?.name}</h1></a>
                <p>by
                    {#each $SpotifyStore.item.artists as artist}
                        {#if $SpotifyStore.item.artists.indexOf(artist) === $SpotifyStore.item.artists.length - 1 && $SpotifyStore.item.artists.length > 1}
                            {" and "}
                        {:else if $SpotifyStore.item.artists.indexOf(artist) === $SpotifyStore.item.artists.length - 1}
                            {""}
                        {:else if $SpotifyStore.item.artists.indexOf(artist) === 0}
                            {""}
                        {:else}
                            {", "}
                        {/if}
                        <a class="hover:underline" href={artist.uri}>{artist.name}</a>
                    {/each}
                </p>
                <p>on
                    <a class="hover:underline" href={$SpotifyStore.item.album.uri}>{$SpotifyStore.item.album.name}</a>
                </p>
                <div>
                    <progress class="progress" value={progress} max={duration} />
                    <span class="text-xs text-white flex justify-between w-full">
                        <p>{Math.floor(progress / 1000 / 60)}:{Math.floor(progress / 1000 % 60).toString().padStart(2, "0")}</p>
                        <p>{Math.floor(duration / 1000 / 60)}:{Math.floor(duration / 1000 % 60).toString().padStart(2, "0")}</p>
                    </span>
                </div>
            </div>
        </section>
    </div>
    {/if}
{/if}