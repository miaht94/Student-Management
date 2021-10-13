import { atom } from 'recoil';

const authAtom = atom({
    key: 'token',
    // get initial state from local storage to enable user to stay logged in
    default: null
});

const userRole = atom({
    key: 'userRole',
    default: 'guest'
});


export { authAtom };