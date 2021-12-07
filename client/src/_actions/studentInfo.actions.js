import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {useFetchWrapper} from '_helpers';
import {studentsAtom, currentClassAtom, alertBachAtom} from '_state';

export{ useStudentInfoAction };

function useStudentInfoAction (param) {
    const fetchWrapper = useFetchWrapper();
    const [students, setStudents] = useRecoilState(studentsAtom);
    const currentClass = useRecoilValue(currentClassAtom);
    const [alert, setAlert] = useRecoilState(alertBachAtom);

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
            setAlert({message: "Lỗi", description: "Không thể xóa thành viên !"});
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            if (rawjson.status == "Success") {
                getStudentList(currentClass);
                setAlert({message: "Thành công", description: "Xóa thành viên thành công !"});
            }
            return rawjson;
          }); 
    }

    async function AddStudent(emails) {
        emails = emails.replace(/\s+/g, '');
        var emailArr = emails.split(',');
        var convertedEmails = '';
        emailArr.forEach(function(element, idx, array){
            
            if (idx === array.length - 1){
                convertedEmails +=  `\"${element}\"`;
            } else {
                convertedEmails +=  `\"${element}\",`;
            }
        });
        var urlencoded = new URLSearchParams();
        urlencoded.append("members",`[${convertedEmails}]`);
        console.log(urlencoded);
        const response = await fetchWrapper.post(`http://localhost:3000/api/classes/${currentClass.class_id}/members/add`, "application/x-www-form-urlencoded", urlencoded);
        if (response == null) {
            console.log("No response.");
            setAlert({message: "Lỗi", description: "Không thể thêm thành viên !"});
            return null;
        }
        response.json().then(rawjson => { 
            if (rawjson.status == "Success") {
                getStudentList(currentClass);
                var description;
                var message = 'Thành công';
                description = `Thêm các thành viên :${rawjson.message.registered} thành công ! Không thể các thành viên :${rawjson.message.failed}`
                if (rawjson.message.registered.length === 0) {
                    description = `Không thể thêm thành viên` ;
                    message = "Thất bại";
                }
                if (rawjson.message.failed.length === 0){
                    description = `Thêm thành viên thành công !`;
                    } 
                setAlert({message: message, description: description});
            }
            return rawjson;
          }); 
    }

    return {
        getStudentList : getStudentList,
        deleteStudent : deleteStudent,
        AddStudent : AddStudent,
    }
}
