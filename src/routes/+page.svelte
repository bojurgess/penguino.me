<script lang="ts">
    export let data: {
        avatar: string;
        banner: string;
        markdown: string;
    }

    import UserProfile from "$lib/components/UserProfile/UserProfile.svelte";
</script>

<UserProfile opts={data}>
    {@html data.markdown}
</UserProfile>