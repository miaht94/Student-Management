import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {useEffect, useState} from 'react'
import { authAtom } from '_state';
import { useClassWrapper } from '_helpers';
import { classPickerVisibleAtom } from '_state';
import {Redirect} from 'react-router-dom';
export { Home };

function Home() {
    const [drawerVisible, setDrawerVisible] = useRecoilState(classPickerVisibleAtom);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const [studentFirstClassLoaded, setStudentFirstClassLoaded] = useState(false);
    const classWrapper = useClassWrapper();
    useEffect(() => {
        
        async function loadFirstClassForStudent(){
            console.log(userData)
            if (userData.role == "student") {
               
                // choose first class if student
                await classWrapper.chooseClassById(null);
                setStudentFirstClassLoaded(true);
                
            }
        }
        loadFirstClassForStudent()
    }) 
    return (<>
    
            {(userData.role === "teacher") && 
                <>
                    <div className="p-4">
                        <div className="container">
                            <h1>Xin chào!</h1>
                            <p>{ClassNameDisplay()}</p>
                        </div>
                    </div>
                </>
            }
            {(userData.role === "student") && 
                <>
                    {(studentFirstClassLoaded && !classWrapper.curClass) &&
                        <>
                            <div className="p-4">
                                <div className="container">
                                    <h1>Xin chào, bạn là học sinh nhưng chưa có lớp!</h1>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
            {(studentFirstClassLoaded && classWrapper.curClass) &&
                <>
                    <Redirect from="*" to={`/${classWrapper.curClass.class_id}/dashboard`} />
                </>
            }
            
            {(userData.role === "admin") && 
                <>
                    <div className="p-4">
                        <div className="container">
                            <h1>Xin chào Admin!</h1>
                        </div>
                    </div>
                </>
            }
        </>)
}
function ClassNameDisplay(){
   if (localStorage.getItem('currentClass')) {
            return "Lớp hiện tại: " + JSON.parse(localStorage.getItem('currentClass')).class_name;
        }
    return "Vui lòng chọn lớp để bắt đầu";  
}