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

<div class="flex justify-center items-center min-h-[100%]">
    <UserProfile opts={data}>
        {@html data.markdown}
    </UserProfile>
</div>