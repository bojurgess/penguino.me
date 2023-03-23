<script lang="ts">
    import { LinkType } from "../../../types/LinkType"

    type link = {
        type: LinkType,
        name: string,
        attributes: {
            url?: string,
            content: string,
            icon: string,
            color: string
        }
    }

    import { CurrentColour, HoveredColour } from "$lib/stores";

    export let links: link[];

    let linksContainer: HTMLElement;
    let ClipboardElement: HTMLElement;

    const handleClipboard = (content: string) => {
        navigator.clipboard.writeText(content);

        ClipboardElement.setAttribute('data-tip', 'Copied to clipboard!');
        setTimeout(() => {
            ClipboardElement.setAttribute('data-tip', content);
        }, 1000)
    }

    // Find a better solution than a bunch of nested if statements cause it stops me from sleeping at night.
</script>

<section class="flex p-2 mb-4 border-2 bg-opacity-75 rounded-b-2xl transition-colors mt-2 bg-black bg-opacity 50" bind:this={linksContainer} style="border-color: {$HoveredColour};">
    {#each links as link}
        {#if links.indexOf(link) === 0}
            {#if link.type === LinkType.Link}
            <a href={link.attributes.url} class="w-full flex py-8 justify-center rounded-l-2xl tooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};'><i class={`${link.attributes.icon} fa-2xl`}></i></a>
            {:else}
            <button class="w-full flex py-8 justify-center rounded-l-2xl tooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};' on:click={() => handleClipboard(link.attributes.content)} bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`}></i></button>
            {/if}
        {:else if links.indexOf(link) === links.length - 1}
            {#if link.type === LinkType.Link}
            <a href={link.attributes.url} class="w-full flex py-8 justify-center rounded-r-2xltooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};'><i class={`${link.attributes.icon} fa-2xl`}></i></a>
            {:else}
            <button class="w-full flex py-8 justify-center rounded-r-2xl tooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};' on:click={() => handleClipboard(link.attributes.content)} bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`}></i></button>
            {/if}
        {:else}
            {#if link.type === LinkType.Link}
            <a href={link.attributes.url} class="w-full flex py-8 justify-center tooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};'><i class={`${link.attributes.icon} fa-2xl`}></i></a>
            {:else}
            <button class="w-full flex py-8 justify-center tooltip tooltip-bottom" data-tip={link.attributes.content} style='background-color: {link.attributes.color};' on:click={() => handleClipboard(link.attributes.content)} bind:this={ClipboardElement}><i class={`${link.attributes.icon} fa-2xl`}></i></button>
            {/if}
        {/if}
    {/each}
</section>