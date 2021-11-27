import { atom } from 'recoil';

export { currentClassAtom };

const currentClassAtom = atom({
    key: {
        name: 'currentclass'
    },
    default: JSON.parse(localStorage.getItem('currentClass'))
});


