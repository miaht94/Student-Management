import { authAtom, userAtom } from '_state';
import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { history } from '_helpers';
import { useAlertActions } from '_actions';

import { useState, useEffect } from "react";

export { useAuthWrapper };

function useAuthWrapper(param) {
      // console.log("Login in wrapper called");
      const [auth, setAuth] = useRecoilState(authAtom);
      // const [user, setUser] = useRecoilState(userAtom);
      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();

      useEffect(() =>{
        return () => {
          
        }
      }, []);

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
              loadUser();
            } else {
              alertActions.error("Không thể đăng nhập. Vui lòng kiểm tra lại tên và mật khẩu");
            }
            console.log("Token registered in Recoil is: " + auth);
          }); 
        }

        async function logout(){
            console.log("Logout in authWrapper called")
            setLoginToken("");
            localStorage.removeItem('userData');
            printLoginToken();
            
        }
  
        function setLoginToken(token){
          setAuth(token);
          //setInterval(() => console.log(auth), 1000);
          var now = new Date();
          now.setMinutes( now.getMinutes() + 1 );
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
          await response.json().then(rawjson => { 
            console.log(rawjson);
            var userProfile = {
              name: rawjson.name,
              role: rawjson.role,
              date_of_birth: rawjson.date_of_birth,
              email: rawjson.email,
              vnu_id: rawjson.vnu_id
            }
            localStorage.setItem('userData', JSON.stringify(userProfile));
          }); 
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
          // user: user,
          // loadUserAtom: loadUserAtom,
          loadLoginToken: loadLoginToken
       };
      }
      
      

      //redirect về login và xoá state


