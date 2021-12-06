import { atom } from 'recoil';

export { scoreAtom, pscoreAtom };

const scoreAtom = atom({
    key: {
        name: 'score'
    },
    default: []
});

const pscoreAtom = atom({
    key: {
        name: 'pscore'
    },
    default: {
        user_ref: {
            _id: "61996dec7a29489204522710",
            name: "Trần Xuân Bách",
            role: "student",
            gender: "male",
            phone_number: "55121565",
            location: "Nam Định",
            date_of_birth: 1637435218661,
            email: "19020001@vnu.edu.vn",
            vnu_id: "19020001",
        },
        scores: [
            {
                "_id": "619a0c53f28cb184224c262c",
                "score": 10,
                "subject": {
                    "_id": "61996e397a2948920454aab3",
                    "subject_name": "Tin học cơ sở",
                    "subject_code": "INT1002",
                    "credits_number": 4,
                    "__v": 0
                },
                "__v": 0
            }]
    }
});