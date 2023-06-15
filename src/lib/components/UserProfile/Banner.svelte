<script lang="ts">
    export let src: string;
</script>

<img src={src} alt="banner" class="banner" />

<style lang="postcss">
    .banner {
        width: 100%;
        height: 128px;
        object-fit: cover;
        border-radius: 6px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>

