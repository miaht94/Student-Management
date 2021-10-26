import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { useAlertActions } from '_actions';
import { classesAtom } from '_state';

export { useClassWrapper };

function useClassWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [classes, setClasses] = useRecoilState(classesAtom);

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
    
    async function chooseClass(cls){
        localStorage.setItem('currentClass', JSON.stringify(cls));
    }

    return {
        getClassList: getClassList,
        createClass: createClass,
        chooseClass: chooseClass
    };
}



