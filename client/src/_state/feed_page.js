import { atom } from 'recoil';

export { feedPageAtom, isInitiatedSocketFeed };

const feedPageAtom = atom({
    key: {
        name: 'feed_page_atom'
    },
    default: {posts: []}
});

class isInitiatedSocketFeed {
    static value = false;
}



