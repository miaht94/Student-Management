import { atom } from 'recoil';

export { bachAtom };

const bachAtom = atom({
    key: {
        name: ''
    },
    default: {
        name: 'Trần Xuân Bách'
    }
});