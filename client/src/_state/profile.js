import { atom } from 'recoil';
export { profileAtom };
const profileAtom = atom({
    key: {
        name: 'profile'
    },
    default:  null
});