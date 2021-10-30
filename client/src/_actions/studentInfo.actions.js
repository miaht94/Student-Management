import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';


import {useFetchWrapper} from '_helpers';
import {studentsAtom} from '_state';

export{ useStudentInfoAction };

function useStudentInfoAction (param) {
    const fetchWrapper = useFetchWrapper();
    const [students, setStudents] = useRecoilState(studentsAtom);

    async function getStudentList(Class){
        console.log("get student list called from studentInfo-action");
        const response = await fetchWrapper.get(`http://localhost:3000/api/classes/${Class.class_id}/members/infors?limit=3`, null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            setStudentData (rawjson);
            return rawjson;
          }); 
    }

    function setStudentData (rawjson) {
        let data = rawjson.message
        setStudents(data);
        console.log("Students info : ", data);
        console.log(students);
    }

    return {
        getStudentList : getStudentList
    }
}
