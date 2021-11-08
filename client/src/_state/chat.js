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

const waitToAddContactAtom = atom({
    key:{
        name: "waitToAddContact"
    },
    default: null
})

const waitForUpdateLatestMsgAtom = atom({
    key: {
        name: "waitForUpdateLatestMsg"
    },
    default: null
})
export { curChatPersonAtom, curListMessagesAtom, curListContactAtom, waitToAddContactAtom, waitForUpdateLatestMsgAtom };