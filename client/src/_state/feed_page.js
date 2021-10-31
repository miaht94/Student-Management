import { atom } from 'recoil';

export { feedPageAtom };

const feedPageAtom = atom({
    key: {
        name: 'feed_page_atom'
    },
    default: {posts: []}
});



