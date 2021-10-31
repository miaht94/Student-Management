import { atom } from 'recoil';

export { studentsAtom };

const studentsAtom = atom({
    key: {
        name: 'students'
    },
    default:  [{
        _id: '',
        key: 1,
        name: 'Nguyễn văn A ' + 1,
        tags: (1 % 2) ? ['Bình thường'] : ['Cảnh cáo'],
        date_of_birth: 1%30 + 1 + '/1/2001',
        email: 1 + 19021000 + '@vnu.edu.vn',
        vnu_id: 19020000 + 1,
    }]
});

   