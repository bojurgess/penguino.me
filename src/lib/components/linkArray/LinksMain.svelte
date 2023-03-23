<script lang="ts">
	import { LinkType } from '../../../types/LinkType';

	type link = {
		type: LinkType;
		name: string;
		attributes: {
			url?: string;
			content: string;
			icon: string;
			color: string;
		};
	};

	import { ColourPalette, HoveredColour, CurrentColour, CurrentlyPlaying } from '$lib/stores';

	export let links: link[];

	let ClipboardElement: HTMLElement;

	const handleClipboard = (content: string) => {
		navigator.clipboard.writeText(content);

		ClipboardElement.setAttribute('data-tip', 'Copied to clipboard!');
		setTimeout(() => {
			ClipboardElement.setAttribute('data-tip', content);
		}, 1000);
	};

	let container: HTMLElement;

	const mouseEnter = () => {
		if (!$CurrentlyPlaying.is_playing) {
			return;
		} else {
			let Colours: any = $ColourPalette;

			const randomColour = Colours[Math.floor(Math.random() * Colours.length)].hex;

			HoveredColour.set(randomColour);

			if (randomColour === $CurrentColour) {
				mouseEnter();
			} else {
				container.style.borderColor = randomColour;
			}
		}
	};

	const mouseLeave = () => {
        if (!$CurrentlyPlaying.is_playing) {
            return;
        } else {
            let Colour: any = $CurrentColour;

            HoveredColour.set(Colour);
                    
            container.style.borderColor = Colour;
        }
	};

	// Find a better solution than a bunch of nested if statements cause it stops me from sleeping at night.
</script>

<section
	bind:this={container}
	on:mouseenter={mouseEnter}
	on:mouseleave={mouseLeave}
	class="flex mb-4 bg-opacity-75 transition-colors mt-2 min-w-[280px] bg-black bg-opacity 50"
>
	{#each links as link}
		{#if links.indexOf(link) === 0}
			{#if link.type === LinkType.Link}
				<a
					target="_blank"
					href={link.attributes.url}
					class="w-full flex py-8 border-2 border-r-0 rounded-bl-2xl justify-center tooltip tooltip-bottom"
					data-tip={link.attributes.content}
					style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
					><i class={`${link.attributes.icon} fa-2xl`} /></a
				>
			{:else}
				<button
					class="w-full flex py-8 justify-center tooltip border-2 border-r-0 rounded-bl-2xl tooltip-bottom"
					data-tip={link.attributes.content}
					style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
					on:click={() => handleClipboard(link.attributes.content)}
					bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`} /></button
				>
			{/if}
		{:else if links.indexOf(link) === links.length - 1}
			{#if link.type === LinkType.Link}
				<a
					target="_blank"
					href={link.attributes.url}
					class="w-full flex py-8 justify-center border-2 border-l-0 rounded-br-2xl tooltip tooltip-bottom"
					data-tip={link.attributes.content}
					style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
					><i class={`${link.attributes.icon} fa-2xl`} /></a
				>
			{:else}
				<button
					class="w-full flex py-8 justify-center border-2 border-l-0 rounded-br-2xl tooltip tooltip-bottom"
					data-tip={link.attributes.content}
					style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
					on:click={() => handleClipboard(link.attributes.content)}
					bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`} /></button
				>
			{/if}
		{:else if link.type === LinkType.Link}
			<a
				target="_blank"
				href={link.attributes.url}
				class="border-y-2 w-full flex py-8 justify-center tooltip tooltip-bottom"
				data-tip={link.attributes.content}
				style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
				><i class={`${link.attributes.icon} fa-2xl`} /></a
			>
		{:else}
			<button
				class="w-full flex py-8 justify-center tooltip border-y-2 tooltip-bottom"
				data-tip={link.attributes.content}
				style="background-color: {link.attributes.color}; border-color: {$HoveredColour}"
				on:click={() => handleClipboard(link.attributes.content)}
				bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`} /></button
			>
		{/if}
	{/each}
</section>
