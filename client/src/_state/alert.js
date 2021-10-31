import { atom } from 'recoil';

const alertAtom = atom({
    key: 'alert',
    default: {message: null, description: null}
});

export { alertAtom };