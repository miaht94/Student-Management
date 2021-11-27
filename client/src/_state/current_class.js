import { atom } from 'recoil';

export { currentClassAtom };

const currentClassAtom = atom({
    key: {
        name: 'curclass'
    },
    default: JSON.parse(localStorage.getItem('currentClass'))
});


