import type { PageLoad } from './$types';
import { marked } from 'marked';

marked.setOptions({
    mangle: false,
    headerIds: false,
})

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/markdown/about.md');
    const md = await res.text();

    return {
        avatar: 'https://cdn.penguino.me/profile/avatar.gif',
        banner: 'https://cdn.penguino.me/profile/banner.gif',
        markdown: marked.parse(md),
        links: [
            {
                name: 'Steam',
                href: 'https://steamcommunity.com/id/penguino__/',
                icon: 'https://cdn.simpleicons.org/steam/ffffff',
                tooltip: 'penguino__',
            },
            {
                name: 'GitHub',
                href: 'https://github.com/bojurgess',
                icon: 'https://cdn.simpleicons.org/github/ffffff',
                tooltip: 'bojurgess',
            },
            {
                name: 'Discord',
                clipboard: 'beno___',
                icon: 'https://cdn.simpleicons.org/discord/ffffff',
                tooltip: 'beno___',
            },
            {
                name: 'Spotify',
                href: 'https://open.spotify.com/user/8fzywdklm84r9hupsurfxdoj2',
                icon: 'https://cdn.simpleicons.org/spotify/ffffff',
                tooltip: '—Beno',
            }
        ]
    };
}