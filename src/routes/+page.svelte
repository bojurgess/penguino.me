<script lang="ts">
	import { CurrentlyPlaying } from '$lib/stores';

	import SpotifyMain from '$components/spotify/SpotifyMain.svelte';
</script>

<main>
    {#if $CurrentlyPlaying}
	    <SpotifyMain />
    {:else}
        <h1>Not playing anything</h1>
    {/if}
</main>