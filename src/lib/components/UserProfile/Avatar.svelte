<script lang="ts">
    export let src: string;
    export let size: "small" | "medium" | "large";
</script>

<img src={src} alt="avatar" class='avatar {size}' />

<style lang="postcss">
    .avatar {
        border-radius: 100%;
    }

    .small {
        width: 32px;
        height: 32px;
    }

    .medium {
        width: 64px;
        height: 64px;
    }

    .large {
        width: 96px;
        height: 96px;
    }

    .xlarge {
        width: 128px;
        height: 128px;
    }
</style>