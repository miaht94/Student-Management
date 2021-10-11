import { useRecoilState } from 'recoil';

import { history } from '_helpers';
import { authAtom } from '_state';
import { useAlertActions } from '_actions';

export { useFetchWrapper };



function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom);
    const alertActions = useAlertActions();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method) {
        return (url, header, body) => {
            const requestOptions = {
                method,
                mode: "no-cors",
                headers: authHeader(url)
            };
            if (body) {
                requestOptions.headers['Content-Type'] = header;
                requestOptions.body = body;
            }
            return fetch(url, requestOptions);
        }
    }
    
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
    
    // async function handleResponse(response) {
    //     var response = await response.json();
    //     return response;
    //     // .then(text => {
    //     //     const data = text && JSON.parse(text);
            
    //     //     if (!response.ok) {
    //     //         if ([401, 403].includes(response.status) && auth?.token) {
    //     //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //     //             localStorage.removeItem('user');
    //     //             setAuth(null);
    //     //             history.push('/account/login');
    //     //         }
    //     //         const error = (data && data.message) || response.statusText;
    //     //         alertActions.error(error);
    //     //         return Promise.reject(error);
    //     //     }
            
    //     //     return data;
    //     // });
    // }    
}
