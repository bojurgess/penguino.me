<script lang="ts">
    import Avatar from "./Avatar.svelte";
    import Banner from "./Banner.svelte";

    export let opts: {
        avatar: string;
        banner: string;
    }

    let descriptionContainer: HTMLElement;

    $: if ($$slots.default && descriptionContainer) {
        descriptionContainer.style.display = "none";
    }
</script>

<div class="w-96 h-fit bg-red-900 border-4 rounded-md border-red-600">
    <section>
        <Banner src={opts.banner} />
    </section>
    <section>
        <Avatar src={opts.avatar} size="large" />
    </section>
    <section bind:this={descriptionContainer} class="h-128 p-4 prose prose-sm prose-invert prose-a:text-red-700 rounded-md m-4 bg-black bg-opacity-60">
        <slot />
    </section>
</div>