import { authAtom } from '_state';
import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { history } from '_helpers';
import { useAlertActions } from '_actions';

export { useAuthWrapper };

function useAuthWrapper(param) {
      // console.log("Login in wrapper called");
      const [auth, setAuth] = useRecoilState(authAtom);
      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();

      async function login(param){
          console.log("Login in wrapper called");
          const response = await fetchWrapper.post("http://localhost:3000/auth/login", "application/x-www-form-urlencoded", param);
          if (response == null) {
            console.log("No response");
          }
          console.log(response);
          response.json().then(rawjson => { 
            console.log(rawjson);
            if (rawjson.status == "Logged In Success"){
              console.log(rawjson.status);
         
              setLoginToken(rawjson.message.token);

            } else {
              alertActions.error("Không thể đăng nhập. Vui lòng kiểm tra lại tên và mật khẩu");
            }
            console.log("Token registered in Recoil is: " + auth);
          }); 
        }
        function logout(){
          return async => {
            setLoginToken('');
            setAuth(null);
          }
        }
  
        function setLoginToken(token){
          setAuth(token);
          setInterval(() => console.log(auth), 1000);
          var now = new Date();
          now.setMinutes( now.getMinutes() + 1 );
          document.cookie = "token=" + token + "expires=" + now.toUTCString() + ";";
          // const response = await fetchWrapper.get("http://localhost:3000/auth/login", "application/x-www-form-urlencoded", param);
          console.log("1 minute token registered.");
          // console.log(getLoginToken());
        }
  
        function loadLoginToken(){
          return async => {
            var allcookies = document.cookie;
            var cookiearray = allcookies.split(';');
            var token = ''
            for(var i=0; i<cookiearray.length; i++){
              var namae = cookiearray[i].split('=')[0];
              var value = cookiearray[i].split('=')[1];
              if (namae=='token') 
                token = value;
            }
            setLoginToken(token);
          }
        }
        return {
          login : login,
          logout : logout,
          tokenValue : auth,
          loadLoginToken: loadLoginToken
       };
      }
      
      

      //redirect về login và xoá state

