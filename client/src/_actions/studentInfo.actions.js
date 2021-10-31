import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {useFetchWrapper} from '_helpers';
import {studentsAtom, currentClassAtom} from '_state';

export{ useStudentInfoAction };

function useStudentInfoAction (param) {
    const fetchWrapper = useFetchWrapper();
    const [students, setStudents] = useRecoilState(studentsAtom);
    const currentClass = useRecoilValue(currentClassAtom);

    async function getStudentList(Class){
        console.log("get student list called from studentInfo-action");
        const response = await fetchWrapper.get(`http://localhost:3000/api/classes/${Class.class_id}/members/infors`, null, null);
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
        console.log("Students info : ", data);
        setStudents(data);
        // console.log(students);
    }

    async function deleteStudent(Id){
        console.log('from delete Student ',Id);
        var urlencoded = new URLSearchParams();
        urlencoded.append("members", `["${Id}"]`); 
        const response = await fetchWrapper.delete(`http://localhost:3000/api/classes/${currentClass.class_id}/members/delete`, "application/x-www-form-urlencoded", urlencoded);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            if (rawjson.status == "Success") {
                getStudentList(currentClass);
            }
            return rawjson;
          }); 
    }

    return {
        getStudentList : getStudentList,
        deleteStudent : deleteStudent,
    }
}
