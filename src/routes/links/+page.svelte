<script lang="ts">
    import type { Link } from "$lib/types/Link";

    export let data: {
        avatar: string;
        banner: string;
        markdown: string;
        links: Link[];
    }

    import UserProfile from "$lib/components/UserProfile/UserProfile.svelte";
</script>

<div class="flex justify-center items-center h-[100vh]">
    <UserProfile opts={data}>
        {@html data.markdown}
    </UserProfile>
</div>