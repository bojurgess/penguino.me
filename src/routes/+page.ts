import type { PageLoad } from './$types';
import { marked } from 'marked';

marked.setOptions({
    mangle: false,
})

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/markdown/about.md');
    const md = await res.text();

    return {
        avatar: 'https://cdn.penguino.me/profile/avatar.gif',
        banner: 'https://cdn.penguino.me/profile/banner.gif',
        // markdown: marked.parse(md),
        markdown: undefined
    };
}