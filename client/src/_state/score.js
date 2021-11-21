import { atom } from 'recoil';

export { scoreAtom, pscoreAtom };

const scoreAtom = atom({
    key: {
        name: 'score'
    },
    default: null
});

const pscoreAtom = atom({
    key: {
        name: 'pscore'
    },
    default: null
});