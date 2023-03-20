<script lang="ts">
	import { CurrentlyPlaying } from '$lib/stores';

    import SpotifyPlaceholder from '$components/spotify/SpotifyPlaceholder.svelte';
	import SpotifyMain from '$components/spotify/SpotifyMain.svelte';

    const placeholderProps = {
        imageurl: 'https://cdn.penguino.me/penguino/hEo54rS.jpeg'
    }
</script>

<main>
    {#if $CurrentlyPlaying}
	    <SpotifyMain />
    {:else}
        <SpotifyPlaceholder data={placeholderProps} />
    {/if}
</main>