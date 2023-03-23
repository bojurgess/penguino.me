<script lang="ts">
	import { CurrentlyPlaying, ProgressData, ColourPalette, CurrentColour, HoveredColour } from '$lib/stores';
	import { getProgressPercentage, getTime } from '$lib/utils/progressUtils';
	import { onMount } from 'svelte';

	let containerElement: HTMLDivElement;
	let colorText: HTMLHeadingElement;

	let state: string = 'paused';
	let audioContainer: HTMLAudioElement;
	let volume = 0.4;

	onMount(async () => {
		if ($CurrentlyPlaying.is_playing) {
			await ColourPalette.set($CurrentlyPlaying.item.album.images[0].url);
			const color: any = $CurrentColour

			HoveredColour.set(color);
			ProgressData.set($CurrentlyPlaying);
			setTimeout(updateProgress, 1000);
		} else {
			updateProgress(1000);
		}
	});

	const updatePlayer = async (timeout: number) => {
		await CurrentlyPlaying.refresh();
		if ($CurrentlyPlaying.is_playing) {
			await ColourPalette.set($CurrentlyPlaying.item.album.images[0].url);
			ProgressData.set($CurrentlyPlaying);
			setTimeout(updateProgress, 1000);
		} else {
			updateProgress(timeout + timeout / 2);
		}
	}

	const updateProgress = async (timeout: number) => {
		if (!$CurrentlyPlaying.is_playing) {
			setTimeout(() => {
				updatePlayer(timeout);
			}, timeout)
		} else {
			if ($ProgressData.progress_ms + 1000 < $ProgressData.duration_ms) {
				ProgressData.increment($ProgressData, $ProgressData.progress_ms + 1000);
				setTimeout(updateProgress, 1000);
			} else {
				await ProgressData.refresh();
				await ColourPalette.set($CurrentlyPlaying.item.album.images[0].url);
				setTimeout(updateProgress, 1000);
			}
		}
	};

	const mouseEnter = () => {
		let Colours: any = $ColourPalette;

		const randomColour = Colours[Math.floor(Math.random()*Colours.length)].hex;

		HoveredColour.set(randomColour);

		if (randomColour === $CurrentColour) {
			mouseEnter();
		} else {
			containerElement.style.borderColor = randomColour;
			colorText.style.color = randomColour;
		}
	}

	const mouseLeave = () => {
		let Colour: any = $CurrentColour;

		HoveredColour.set(Colour);

		containerElement.style.borderColor = Colour;
		colorText.style.color = '#ffffff';
	}
</script>

{#if $CurrentlyPlaying && $CurrentlyPlaying.is_playing}
	{#if $ProgressData}
		<div on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="transition-colors flex flex-col sm:flex-row justify-center items-center text-white p-2 rounded-t-2xl border-2 w-fit bg-black bg-opacity-50" style="border-color: {$CurrentColour};" bind:this={containerElement}>
			{#key $CurrentlyPlaying.item.name}
			<a href={$CurrentlyPlaying.item.album.uri}
				><img
					class="w-full max-w-[360px] sm:max-w-[200px] rounded-2xl"
					src={$CurrentlyPlaying.item.album.images[0].url}
					alt="Album cover"
				/></a
			>
			<div class="flex flex-col text-2xl px-2 sm:px-8 justify-center truncate text-ellipsis text-center sm:text-start items-center sm:items-start pt-2 sm:pt-0">
				<a class="font-bold hover:underline w-fit" href={$CurrentlyPlaying.item.uri}
					><h2 class="transition-colors" bind:this={colorText}>{$CurrentlyPlaying.item?.name}</h2></a
				>
				<span class="flex text-xl hover:underline w-fit">
					{#each $CurrentlyPlaying.item.artists as artist (artist.name)}
						{#if $CurrentlyPlaying.item.artists.indexOf(artist) !== $CurrentlyPlaying.item.artists.length - 1}
							<h2><a href={artist.uri}>{artist.name}</a></h2>
							<span class="mr-1">{','}</span>
						{:else}
							<h2><a href={artist.uri}>{artist.name}</a></h2>
						{/if}
					{/each}
				</span>
				<div class="flex flex-col sm:flex-row text-lg justify-between items-center w-full pt-4">
					<div class="w-fit flex items-center">
						<span class="mr-2">{getTime($ProgressData.progress_ms)}</span>
						<progress
							class="progress w-full"
							value={getProgressPercentage($ProgressData.progress_ms, $ProgressData.duration_ms)}
							max={100}
						/>
						<span class="ml-2 sm:mr-8">{getTime($ProgressData.duration_ms)}</span>
					</div>
					{#if $CurrentlyPlaying.item.preview_url}
						<audio bind:this={audioContainer} bind:volume>
							<source src={$CurrentlyPlaying.item.preview_url} type="audio/mpeg" />
						</audio>
						<div class="tooltip tooltip-right hidden sm:block" data-tip="Preview the Song 🎵">
							<button
								class="bg-white rounded-full shadow-xl text-black w-12 h-12 flex justify-center items-center"
								on:click={() => {
									if (state === 'paused') {
										audioContainer.play();
										state = 'playing';
									} else {
										audioContainer.pause();
										state = 'paused';
									}
								}}
							>
								{#if state === 'paused'}
									<i class="fa-solid fa-play" />
								{:else}
									<i class="fa-solid fa-pause" />
								{/if}
							</button>
						</div>
					{/if}
				</div>
			</div>
			{/key}
		</div>
	{/if}
{/if}

<style>
	img,
	progress {
		box-shadow: 0 9px 9px #0000004d, 0 0 29px #0006;
	}

	h2,
	span {
		text-shadow: 0 6px 9px rgba(0, 0, 0, 0.8);
	}

	img::after {
		content: "";
		background-color: black;
	}
</style>
