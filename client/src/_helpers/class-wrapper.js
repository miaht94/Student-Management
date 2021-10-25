import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { useAlertActions } from '_actions';

import { useState, useEffect } from "react";

export { useClassWrapper };

function useClassWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();

    async function getClassList(){
        console.log("Get class list wrapper called.");
        const response = await fetchWrapper.get("http://localhost:3000/api/classes/me", null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        await response.json().then(rawjson => { 
            console.log(rawjson);
            return rawjson;
          }); 
    }

    async function createClass(param){
        console.log("Create class wrapper called");
          const response = await fetchWrapper.post("http://localhost:3000/api/classes/create", "application/x-www-form-urlencoded", param);
          if (response == null) {
            console.log("No response");
          }
          console.log(response);
          response.json().then(rawjson => { 
            console.log(rawjson);
            if (rawjson.status == "Success"){
              console.log(rawjson);
            } else {
              alertActions.error("Không thể tạo lớp");
            }
          }); 
    }
    
    async function chooseClass(cls){
        localStorage.setItem('currentClass', JSON.stringify(cls));
    }

    return {
        getClassList: getClassList,
        createClass: createClass,
        chooseClass: chooseClass
    };
}



