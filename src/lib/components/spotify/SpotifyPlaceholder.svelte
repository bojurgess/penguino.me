<script lang="ts">
    export let data: {
        imageurl: string;
    };

	let state: string = 'paused';
	let audioContainer: HTMLAudioElement;
    let audioUrl: string = 'https://cdn.penguino.me/ronniemcnutt.mp3'
    let volume = 0.4;
</script>

<div class="flex text-white p-2 w-fit rounded-2xl bg-red-900">
    <img
    class="max-w-[200px] rounded-2xl"
    src={data.imageurl}
    alt="Album cover"
    />
    <div class="flex flex-col text-3xl px-8 justify-center">
        <h2 class="font-bold">Beno</h2>
        <h2 class="text-xl">swiggity swag</h2>
        <div class="flex text-lg justify-between items-center w-full pt-4">
            <span class="mr-2">{"0:23"}</span>
            <progress
                class="progress w-full"
                value={23}
                max={100}
            />
            <span class="ml-2 mr-8">{"4:20"}</span>
            {#if audioUrl}
		        <audio bind:this={audioContainer} bind:volume={volume}>
		        	<source src={audioUrl} type="audio/mpeg" />
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

<style>
	img,
	progress {
		box-shadow: 0 9px 9px #0000004d, 0 0 29px #0006;
	}

	h2, span {
		text-shadow: 0 6px 9px rgba(0, 0, 0, 0.8);
	}
</style>
