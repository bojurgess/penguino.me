<script lang="ts">
    import { CurrentlyPlaying, ProgressData } from "$lib/stores";
    import { getProgressInfo, getProgressPercentage, getTime } from "$lib/utils/progressUtils"
	import { onMount } from "svelte";

    onMount(async () => {
        ProgressData.set($CurrentlyPlaying)
        setTimeout(updateProgress, 1000)
    });

    const updateProgress = () => {
        if (!$CurrentlyPlaying.is_playing) {
            setTimeout(updateProgress, 1000)
        } else {
            if ($ProgressData.progress_ms + 1000 < $ProgressData.duration_ms) {
                ProgressData.increment($ProgressData, ($ProgressData.progress_ms + 1000))
                setTimeout(updateProgress, 1000)
                console.log($ProgressData.progress_ms)
            } else {
                ProgressData.refresh()
                setTimeout(updateProgress, 1000)
                console.log($ProgressData)
            }
        }
    }
</script>

{#if $ProgressData}
    <div class="flex bg-pink-800 text-white p-4 max-w-fit rounded-2xl">
        <a href={$CurrentlyPlaying.item.album.uri}><img class="max-w-[256px] rounded-2xl" src={$CurrentlyPlaying.item.album.images[0].url} alt="Album cover" /></a>
        <div class="flex flex-col text-3xl px-8 justify-center">
            <a class="font-bold hover:underline" href={$CurrentlyPlaying.item.uri}><h2>{$CurrentlyPlaying.item?.name}</h2></a>
            <span class="flex text-xl hover:underline">
                {#each $CurrentlyPlaying.item.artists as artist}
                    {#if $CurrentlyPlaying.item.artists.indexOf(artist) !== $CurrentlyPlaying.item.artists.length - 1}
                        <h2><a href={artist.uri}>{artist.name}</a></h2>
                        <span class="mr-1">{','}</span>
                    {:else}
                        <h2><a href={artist.uri}>{artist.name}</a></h2>
                    {/if}
                {/each}
            </span>
            <div class="flex text-lg justify-center items-center">
                <span class="mr-2">{getTime($ProgressData.progress_ms)}</span>
                <progress class="progress w-full" value={getProgressPercentage($ProgressData.progress_ms, $ProgressData.duration_ms)} max={100}></progress>
                <span class="ml-2">{getTime($ProgressData.duration_ms)}</span>
            </div>
        </div>
    </div>
{/if}

<style>
    img, progress {
        box-shadow: 0 9px 9px #0000004d,0 0 29px #0006;
    }

    h2 {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }
</style>

