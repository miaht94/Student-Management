import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {useFetchWrapper} from '_helpers';
import { profileAtom , currentClassAtom, alertBachAtom} from '_state';
import { useAlertActions , useStudentInfoAction} from '_actions';


export {useProfileAction} 

function useProfileAction() {

    const fetchWrapper = useFetchWrapper();
    const [profile,setProfile] = useRecoilState(profileAtom);
    const currentClass = useRecoilValue(currentClassAtom);
    const alertActions = useAlertActions();
    const studentInfoAction = useStudentInfoAction();
    const [alert, setAlert] = useRecoilState(alertBachAtom);

    async function getProfileById(Id) {
        console.log("get profile by id");
        const response = await fetchWrapper.get(`http://localhost:3000/api/profile/${Id}`, null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            return rawjson;
          }); 
    }

    async function getMyProfile() {
        console.log("get my profile");
        const response = await fetchWrapper.get(`http://localhost:3000/api/profile/me`, null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }   
        response.json().then(rawjson => {   
            console.log(rawjson);
            setMyProfile(rawjson);
            console.log('set my profile here');
            return rawjson;
          }); 
    }

    function setMyProfile(rawjson) {
        console.log('set my profile', rawjson);
        setProfile(rawjson.message);
    }

    async function handleSubmit (info,Id,isTable){
        var urlencoded = new URLSearchParams();
        console.log('from profile action',info);
        Object.entries(info).map(([key, val]) => {
            urlencoded.append(key,val);
            }
        )
        const response = await fetchWrapper.post(`http://localhost:3000/api/profile/edit/${Id}`, "application/x-www-form-urlencoded", urlencoded);
        if (response == null) {
          console.log("No response");
        }
        response.json().then(rawjson => { 
          console.log(rawjson);
          if (rawjson.status == "Success"){
            getMyProfile();
            if(isTable) {
              studentInfoAction.getStudentList(currentClass);
            }
            setAlert({message: "Thành công", description: "Cập nhật thông tin thành công"});
          } else {
            setAlert({message: "Lỗi", description: rawjson.message});
          }
        }); 
    }

    return {
        getProfileById : getProfileById,
        getMyProfile : getMyProfile,
        setMyProfile : setMyProfile,
        handleSubmit : handleSubmit,
    }
}