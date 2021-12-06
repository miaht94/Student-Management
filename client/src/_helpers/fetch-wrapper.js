import { useRecoilState } from 'recoil';

import { history } from '_helpers';
import { authAtom } from '_state';
import { useAlertActions } from '_actions';

export { useFetchWrapper };



function useFetchWrapper() {
    // const authWrapper = useAuthWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const alertActions = useAlertActions();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
        requestFile: requestFile('GET')
    };

    function request(method) {

        async function requestor(url, header, body) {
            var myHeaders = new Headers();
            if (header) myHeaders.append("Content-Type", header);
            const requestOptions = {
                method: method,
                mode: "no-cors",
                headers: myHeaders,
                redirect: 'follow'
            };
            if(method == 'DELETE'){
                requestOptions.mode = 'cors';
            }
            if (body) {
                requestOptions.headers['Content-Type'] = header;
                requestOptions.body = body;
            }
            return await fetch(url, requestOptions);
        }
     
         return async (url, header, body) => {
            let response = await requestor(url, header, body);
            let rawjson = await response.clone().json();
            if (url != "http://localhost:3000/api/profile/me"){
                if ("message" in rawjson) {
                    if (rawjson.status === "Error" && (rawjson.message.name === "TokenNotFound" || rawjson.message.name === "UserNotFound")){
                        console.log(rawjson.status);
                        setAuth(null);
                        // localStorage.removeItem('userData');
                        localStorage.clear();
                    }
                }
            }
            return response;
        }
    }

    function requestFile(method) {

        async function requestor(url, header, body) {
            var myHeaders = new Headers();
            if (header) myHeaders.append("Content-Type", header);
            const requestOptions = {
                method: method,
                mode: "no-cors",
                headers: myHeaders,
                redirect: 'follow'
            };
            if(method == 'DELETE'){
                requestOptions.mode = 'cors';
            }
            if (body) {
                requestOptions.headers['Content-Type'] = header;
                requestOptions.body = body;
            }
            return await fetch(url, requestOptions);
        }
     
         return async (url, header, body) => {
            let response = await requestor(url, header, body);
            return response;
        }
    }
    // function loginrequest(method){
    //     console.log("Test Login request");
    // }
    
    // helper functions
    
    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }
    
    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    setAuth(null);
                    history.push('/account/login');
                }
                const error = (data && data.message) || response.statusText;
                alertActions.error(error);
                return Promise.reject(error);
            }
            
            return data;
        });
    }    
}
