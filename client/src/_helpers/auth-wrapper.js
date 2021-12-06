import { authAtom} from '_state';
import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { useAlertActions ,useProfileAction} from '_actions';
import { alertBachAtom } from '_state';
export { useAuthWrapper };

function useAuthWrapper(param) {
      // console.log("Login in wrapper called");
      const [auth, setAuth] = useRecoilState(authAtom);
      // const [user, setUser] = useRecoilState(userAtom);
      const [alert, setAlert] = useRecoilState(alertBachAtom)
      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();
      const profileAction = useProfileAction();

      async function login(param){
          console.log("Login in wrapper called");
          const response = await fetchWrapper.post("http://localhost:3000/auth/login", "application/x-www-form-urlencoded", param);
          if (response == null) {
            console.log("No response");
          }
          console.log(response);
          let rawjson = await response.json()
            console.log(rawjson);
            if (rawjson.status === "Logged In Success"){
              console.log(rawjson.status);
              setLoginToken(rawjson.message.token);
              await loadUser();
            } else {
              setAlert({message: "Thất bại", description: "Sai tên đăng nhập hoặc mật khẩu"});
            }
            console.log("Token registered in Recoil is: " + auth);
            return rawjson
        }

        async function logout(){
            console.log("Logout in authWrapper called")
            setLoginToken("");
            // localStorage.removeItem('userData');
            localStorage.clear();
            printLoginToken();
        }
  
        function setLoginToken(token){
          setAuth(token);
          //setInterval(() => console.log(auth), 1000);
          var now = new Date();
          now.setMinutes( now.getMinutes() + 1000 );
          document.cookie = `token=${token};expires=${now.toUTCString()};path=/`;
          console.log("1 minute token registered.");
        }

        function printLoginToken(token){
          console.log(document.cookie);
          console.log(auth);
        }

        async function loadUser(){
          const response = await fetchWrapper.get("http://localhost:3000/api/profile/me", null, null);
          if (response == null) {
            console.log("No response.");
          }
          // console.log(response);
          let rawjson = await response.json()
          console.log(rawjson);
          rawjson = rawjson.message
          var userProfile = {
            name: rawjson.name,
            role: rawjson.role,
            date_of_birth: rawjson.date_of_birth,
            email: rawjson.email,
            vnu_id: rawjson.vnu_id
          }
          console.log(userProfile)
          profileAction.getMyProfile();
          localStorage.setItem('userData', JSON.stringify(userProfile));
        }

        async function getUserInfo() {
          let data = JSON.parse(localStorage.getItem("userData"))
          if (data  && data.vnu_id) {
            return data
          }
            
          else {
            await loadUser();
          }
          return JSON.parse(localStorage.getItem("userData"))
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

        async function forgetPassword(params) {
          console.log(params)
          var urlencoded = new URLSearchParams();
          urlencoded.append("email", params.email);
          let response = {message: ""};
          try {
            response = await fetchWrapper.post("http://localhost:3000/api/auth/forget_password", "application/x-www-form-urlencoded", urlencoded);
            response = await response.json();
            // console.log(response)
            if (response.status == "Success") {
              setAlert({message: "Thành công", description: response.message})
            } else throw Error("Forget Password fail")
          } catch (e) {
            setAlert({message: "Thất bại", description: response.message})
          }
        }

        return {
          login : login,
          logout : logout,
          tokenValue : auth,
          getUserInfo : getUserInfo,
          forgetPassword: forgetPassword,
          // user: user,
          // loadUserAtom: loadUserAtom,
          loadLoginToken: loadLoginToken,
          loadUser
       };
      }



