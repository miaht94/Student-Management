import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { useAlertActions } from '_actions';
import { classesAtom } from '_state';
import {currentClassAtom} from '_state'
export { useClassWrapper };

function useClassWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [classes, setClasses] = useRecoilState(classesAtom);
    const [curClass, setCurClass] = useRecoilState(currentClassAtom);
    async function getClassList(){
        console.log("Get class list wrapper called.");
        const response = await fetchWrapper.get("http://localhost:3000/api/classes/me", null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            setClasses(rawjson);
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
    
    async function chooseClass(cls) {
		    setCurClass(cls);
        localStorage.setItem('currentClass', JSON.stringify(cls));
        console.log("Choosen class :", cls)
    }

    async function chooseClassById(classId) {
      	let response = await fetchWrapper.get("http://localhost:3000/api/classes/me", null, null);
      	response = await response.json();
		  console.log(response)
		  for (var myClass of response) {
    		if(classId == myClass.class_id) {
			
				chooseClass(myClass);
				break;
			}
      	}

    } 

    return {
        classes : classes,
        curClass,
        getClassList: getClassList,
        createClass: createClass,
        chooseClass: chooseClass,
		    chooseClassById,
        setCurClass
    };
}



