<script lang="ts">
	import { CurrentlyPlaying, ProgressData, ColourPalette, CurrentColour } from '$lib/stores';
	import { getProgressPercentage, getTime } from '$lib/utils/progressUtils';
	import { onMount } from 'svelte';

	let state: string = 'paused';
	let audioContainer: HTMLAudioElement;
    let volume = 0.4;

	onMount(async () => {
		await ColourPalette.set($CurrentlyPlaying.item.album.images[0].url);
		ProgressData.set($CurrentlyPlaying);
		setTimeout(updateProgress, 1000);
	});

	const updateProgress = async () => {
		if (!$CurrentlyPlaying.is_playing) {
			setTimeout(updateProgress, 1000);
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
</script>

{#if $ProgressData}
	<div class="flex text-white p-2 w-fit rounded-2xl" style="background-color: {$CurrentColour};">
		<a href={$CurrentlyPlaying.item.album.uri}
			><img
				class="max-w-[200px] rounded-2xl"
				src={$CurrentlyPlaying.item.album.images[0].url}
				alt="Album cover"
			/></a
		>
		<div class="flex flex-col text-3xl px-8 justify-center">
			<a class="font-bold hover:underline" href={$CurrentlyPlaying.item.uri}
				><h2>{$CurrentlyPlaying.item?.name}</h2></a
			>
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
			<div class="flex text-lg justify-between items-center w-full pt-4">
                <div class="w-fit flex items-center">
                    <span class="mr-2">{getTime($ProgressData.progress_ms)}</span>
                    <progress
                        class="progress w-full"
                        value={getProgressPercentage($ProgressData.progress_ms, $ProgressData.duration_ms)}
                        max={100}
                    />
                    <span class="ml-2 mr-8">{getTime($ProgressData.duration_ms)}</span>
                </div>
				{#if $CurrentlyPlaying.item.preview_url}
					<audio bind:this={audioContainer} bind:volume={volume}>
						<source src={$CurrentlyPlaying.item.preview_url} type="audio/mpeg" />
					</audio>
					<div class="tooltip tooltip-bottom" data-tip="Preview the Song 🎵">
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
	</div>
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
</style>
