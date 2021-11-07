
import { atom } from 'recoil';

const alertBachAtom = atom({
    key: 'alertBach',
    default: {message: null, description: null}
});

export { alertBachAtom };