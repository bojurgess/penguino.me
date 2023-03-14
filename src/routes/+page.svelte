<script lang='ts'>
    import { CurrentlyPlaying, ProgressData } from "$lib/stores";
	import { onMount } from "svelte";

    import SpotifyMain from '$components/spotify/SpotifyMain.svelte'
</script>

{#if $CurrentlyPlaying}
    <SpotifyMain />
{/if}
<button on:click={() => ProgressData.refresh()}>Refresh</button>
