<script lang="ts">
    import type { Link } from "$lib/types/Link";
	import SpotifyWidget from "../Spotify/SpotifyWidget.svelte";

    import Avatar from "./Avatar.svelte";
    import Banner from "./Banner.svelte";

    export let opts: {
        avatar: string;
        banner: string;
        links: Link[];
    };

    const handleClick = (text: string | undefined, tooltip: string, name: string) => () => {
        let el: HTMLElement = document.getElementById(name) as HTMLElement;

        navigator.clipboard.writeText(text as string);
        el.setAttribute("data-tip", "Copied!");
        setTimeout(() => el.setAttribute("data-tip", tooltip), 1000);
    };
</script>

<div class="w-96 h-fit bg-red-900 border-4 rounded-md border-red-600 flex flex-col">
    <section id="top" class="relative">
        <Banner src={opts.banner} />
        <div class='absolute rounded-full border-8 border-red-900 w-fit h-fit left-1 top-14'>
            <Avatar src={opts.avatar} size="large" />
        </div>
    </section>
    {#if $$slots.default}
    <section id="about" class="text-white h-128 p-4 mt-12 prose prose-sm prose-invert prose-a:text-red-700 prose-headings:m-0 prose-headings:text-white prose-h2:mb-4 prose-hr:my-2 prose-hr:border-white rounded-md m-4 bg-black bg-opacity-60">
        <slot />
    </section>
    {/if}
    <section id="Spotify" class="p-4 bg-black bg-opacity-60 mx-4 rounded-md">
        <SpotifyWidget />
    </section>
    <section id="links" class="p-4 px-16 m-4 bg-black bg-opacity-60 rounded-md flex justify-between">
        {#each opts.links as link}
            {#if link.href}
                <a class="tooltip tooltip-error" data-tip={link.tooltip} href={link.href}>
                    <img src={link.icon} alt={link.name} class="w-8 h-8" />
                </a>
            {:else if link.clipboard}
                <button id={link.name} class="tooltip tooltip-error" data-tip={link.tooltip} on:click={handleClick(link.clipboard, link.tooltip, link.name)}>
                    <img src={link.icon} alt={link.name} class="w-8 h-8" />
                </button>
            {:else}
                <img src={link.icon} alt={link.name} class="w-8 h-8" />
            {/if}
        {/each}
    </section>
</div>