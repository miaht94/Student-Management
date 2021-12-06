import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { useClassWrapper } from '_helpers';
import { authAtom, usersAtom, userAtom } from '_state';

export { useClassActions };

function useClassActions () {
    const classWrapper = useClassWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);

    return {
        createClass,
        getClassList,
        setCurrentClass,
        getCurrentClass
    }

    async function createClass({ class_name }) {
        console.log("Create class called.");
        var details = {
            'class_name': class_name
        };
        
        var urlencoded = new URLSearchParams();
        urlencoded.append('class_name', class_name);
        classWrapper.createClass(urlencoded).then(response => {
            console.log(response);
        });
    }

    async function getClassList() {
        console.log("Get class list called.");
        return classWrapper.getClassList();
    }

    async function setCurrentClass(cls){
        await classWrapper.chooseClass(cls);
    }

    async function getCurrentClass(cls){
        
        return JSON.parse(localStorage.getItem('currentClass'));
    }
}
