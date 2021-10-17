import { authAtom, userAtom } from '_state';
import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { history } from '_helpers';
import { useAlertActions } from '_actions';

import { useState, useEffect } from "react";

export { useClassWrapper };

function useClassWrapper(param) {
    const fetchWrapper = useFetchWrapper();

    async function getClassList(){
        const response = await fetchWrapper.get("http://localhost:3000/api/classes/me", null, null);
        if (response == null) {
            console.log("No response.");
        }
        await response.json().then(rawjson => { 
            console.log(rawjson);
          }); 
    }

    return {
        getClassList: getClassList 
    };
}



