<script lang='ts'>
    import { CurrentlyPlaying } from "$lib/stores";
	import { onMount } from "svelte";

    onMount(() => console.log($CurrentlyPlaying))
</script>

{#if $CurrentlyPlaying}
    <h1>Currently Playing</h1>
    <p>{$CurrentlyPlaying.item?.name}</p>
    <p>{$CurrentlyPlaying.item?.artists[0].name}</p>
    <p>{$CurrentlyPlaying.item?.album.name}</p>
    <p>{$CurrentlyPlaying.item?.album.images[0].url}</p>
    <p>{$CurrentlyPlaying.item?.duration_ms}</p>
    <p>{$CurrentlyPlaying.item?.explicit}</p>
    <p>{$CurrentlyPlaying.item?.external_urls.spotify}</p>
    <p>{$CurrentlyPlaying.item?.href}</p>
    <p>{$CurrentlyPlaying.item?.id}</p>
    <p>{$CurrentlyPlaying.item?.is_local}</p>
    <p>{$CurrentlyPlaying.item?.preview_url}</p>
    <p>{$CurrentlyPlaying.item?.track_number}</p>
    <p>{$CurrentlyPlaying.item?.type}</p>
    <p>{$CurrentlyPlaying.item?.uri}</p>
    <p>{$CurrentlyPlaying.progress_ms}</p>
    <p>{$CurrentlyPlaying.is_playing}</p>
{/if}
<button on:click={() => CurrentlyPlaying.refresh()}>Refresh</button>
