<script lang="ts">
	import SpotifyMain from '$components/spotify/SpotifyMain.svelte';
	import LinksMain from '$components/linkArray/LinksMain.svelte';
	import { CurrentlyPlaying, CurrentColour, HoveredColour, ColourPalette } from '$lib/stores';
	
	import { LinkType } from '../../types/LinkType';

	const placeholderProps = {
		imageurl: 'https://cdn.penguino.me/penguino/hEo54rS.jpeg'
	};

	const links = [
		{
			type: LinkType.Link,
			name: 'Github',
			attributes: {
				url: 'https://github.com/bojurgess',
				content: '/bojurgess',
				icon: 'fa-brands fa-github',
				color: '#24292e'
			}
		},
		{
			type: LinkType.Link,
			name: 'Spotify',
			attributes: {
				url: 'https://open.spotify.com/user/8fzywdklm84r9hupsurfxdoj2',
				content: '—Beno',
				icon: 'fa-brands fa-spotify',
				color: '#1db954'
			}
		},
		{
			type: LinkType.Link,
			name: 'Steam',
			attributes: {
				url: 'https://steamcommunity.com/id/penguino__/',
				content: '/penguino__',
				icon: 'fa-brands fa-steam',
				color: '#000000'
			}
		},
		{
			type: LinkType.Clipboard,
			name: 'Discord',
			attributes: {
				content: 'beno#8252',
				icon: 'fa-brands fa-discord',
				color: '#7289da'
			}
		}
	]
</script>

<body class="w-screen h-screen flex flex-col justify-center items-center bg-neutral-900">
	<div class="flex flex-col rounded-xl p-2 sm:p-0">
		{#if $CurrentlyPlaying.is_playing}
			<h1 class="text-8xl text-center rounded-2xl mb-4 p-2 font-bold text-white w-full transition-colors shadow-lg" style="border-color: {$HoveredColour}; color: {$HoveredColour}">beno.</h1>
			<SpotifyMain />
		{:else}
			<h1 class="border-2 rounded-t-8xl p-4 font-bold bg-black bg-opacity-50 text-4xl text-white">beno.</h1>
			<div class="text-white flex justify-center items-center text-right bg-black bg-opacity-50 border-2 mt-2 px-4 py-4">
				<i class="fa-brands fa-spotify fa-2xl mr-2"></i>
				<p class="text-md font-semibold">I'm not listening to anything on spotify right now.</p>
			</div>
		{/if}
		<LinksMain {links} />
	</div>
</body>

