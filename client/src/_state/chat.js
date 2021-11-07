import { atom } from 'recoil';



const curChatPersonAtom = atom({
    key: {
        name: 'curChatPerson'
    },
    default:  null, 
});

const curListMessagesAtom = atom({
    key: {
        name: 'curListMessages'
    },
    default: null,
})

const curListContactAtom = atom({
    key: {
        name: 'curListContact'
    },
    default: null,
})
export { curChatPersonAtom, curListMessagesAtom, curListContactAtom };