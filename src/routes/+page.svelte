<script lang='ts'>
    import { CurrentlyPlaying } from "$lib/stores";

    import SpotifyMain from '$components/spotify/SpotifyMain.svelte'
</script>

{#if $CurrentlyPlaying}
    <SpotifyMain />
{/if}
