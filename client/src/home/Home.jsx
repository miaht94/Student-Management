import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { Home };

function Home() {

    const userData = localStorage.getItem("userData");

    return (
        <div className="p-4">
            <div className="container">
                <h1>Xin chào!</h1>
                <p>{ClassNameDisplay()}</p>
            </div>
        </div>
    );
}

function ClassNameDisplay(){
   if (localStorage.getItem('currentClass')) {
            return "Lớp hiện tại: " + JSON.parse(localStorage.getItem('currentClass')).class_name;
        }
    return "Vui lòng chọn lớp để bắt đầu";  
}