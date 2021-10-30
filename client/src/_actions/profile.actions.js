import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {useFetchWrapper} from '_helpers';
import { profileAtom } from '_state';
import { useAlertActions } from '_actions';


export {useProfileAction} 

function useProfileAction() {

    const fetchWrapper = useFetchWrapper();
    const [profile,setProfile] = useRecoilState(profileAtom);
    const alertActions = useAlertActions();
    
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

    async function handleSubmit (info,Id){
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
          } else {
            alertActions.error("Không thể cập nhật thông tin");
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