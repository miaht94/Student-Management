import { atom } from 'recoil';

export { dashboardGPAAtom, dashboardLevelGPAAtom, dashboardFilterGPAAtom, dashboardGPAStatusAtom, dashboardLevelStatusAtom };

const dashboardGPAAtom = atom({
    key: {
        name: 'GPA'
    },
    default: [{
        vnu_id: 0,
        name: 0,
        email: 0,
        gpa: 0
    }]
});

const dashboardLevelGPAAtom = atom({
    key: {
        name: 'levelGPA'
    },
    default: {
        data: []
    }
});

const dashboardFilterGPAAtom = atom({
    key: {
        name: 'filterGPA'
    },
    default: 'nofilter'
});

const dashboardGPAStatusAtom = atom({
    key: {
        name: 'GPA'
    },
    default: [{
        vnu_id: 0,
        name: 0,
        email: 0,
        gpa: 0
    }]
});

const dashboardLevelStatusAtom = atom({
    key: {
        name: 'levelGPA'
    },
    default: {
        data: []
    }
});


