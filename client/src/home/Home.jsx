import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { authAtom, classPickerVisibleAtom } from '_state';
import { Button } from 'antd';
import { useAuthWrapper, useClassWrapper } from '_helpers';
export { Home };

function Home() {
    const [drawerVisible, setDrawerVisible] = useRecoilState(classPickerVisibleAtom);
    const classWrapper = useClassWrapper();

    const userData = localStorage.getItem("userData");

    const onClick = () => {
        classWrapper.getClassList();
        setDrawerVisible(true);
    };
    return (
        <div className="p-4">
            <div className="container">
                <h3>Phần mềm Quản lý Sinh viên - Cố vấn học tập</h3>
                <b>Thực hiện bởi:</b> {" Trần Xuân Bách, Đặng Thế Hoàng Anh, Nguyễn Việt Anh, Hoàng Hữu Bách, Nguyễn Bá Anh Tuấn"}
                <br/>
                <p>Vui lòng chọn lớp để bắt đầu.</p>
                <Button type="primary" onClick = {onClick}>Chọn lớp</Button>
                <br/>
                <br/>
                <br/>
                
                <br/>
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