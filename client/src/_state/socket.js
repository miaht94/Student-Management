import { atom } from 'recoil';



const socketAtom = atom({
    key: {
        name: 'socket-io'
    },
    default: null
});
export { socketAtom };