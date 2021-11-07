import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { useAlertActions, useStudentInfoAction } from '_actions';
import { classesAtom } from '_state';
import {currentClassAtom} from '_state'
export { useClassWrapper };

function useClassWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const studentInfoAction = useStudentInfoAction();
    const [classes, setClasses] = useRecoilState(classesAtom);
    const [curClass, setCurClass_] = useRecoilState(currentClassAtom);
    async function getClassList(){
        console.log("Get class list wrapper called.");
        const response = await fetchWrapper.get("http://localhost:3000/api/classes/me", null, null);
        if (response == null) {
            console.log("No response.");
        }
        response.json().then(rawjson => { 
            setClasses(rawjson);
          });
    }

    async function createClass(param){
        var urlencoded = new URLSearchParams();
        urlencoded.append("class_name", param);
        console.log("Create class wrapper called");
          const response = await fetchWrapper.post("http://localhost:3000/api/classes/create", "application/x-www-form-urlencoded", urlencoded);
          if (response == null) {
            console.log("No response");
          }
          response.json().then(rawjson => { 
            console.log(rawjson);
            if (rawjson.status == "Success"){
              getClassList();
            } else {
              alertActions.error("Không thể tạo lớp");
            }
          }); 
    }
    
    function setCurClass(cls) {
      setCurClass_(cls);
      localStorage.setItem("curClass", cls)
    }

    function chooseClass(cls) {
      setCurClass(cls);
      localStorage.setItem('currentClass', JSON.stringify(cls));
      console.log("Choosen class :", cls)
      if (cls !== undefined) {
        studentInfoAction.getStudentList(cls);
      } 
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



