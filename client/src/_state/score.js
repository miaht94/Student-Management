import { atom } from 'recoil';

export { scoreAtom };

const scoreAtom = atom({
    key: {
        name: 'score'
    },
    default: null
});