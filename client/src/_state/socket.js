import { atom } from 'recoil';



const socketAtom = atom({
    key: {
        name: 'socket-io'
    },
    default: null
});

const socketConnected = atom( {
    key: {
        name: 'socket-connected'
    },
    default: false
})
export { socketAtom, socketConnected };