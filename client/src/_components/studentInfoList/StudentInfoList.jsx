import 'antd/dist/antd.css';
import { useRecoilState, useRecoilValue } from 'recoil';

import { studentsAtom } from '_state';
import { StudentInfoTable } from '_components/studentInfoList';

export { StudentInfoList };

function StudentInfoList() {

    const [student, setstudent] = useRecoilState(studentsAtom);
    return (
        <div className="p-4">
            
            <StudentInfoTable data={student}/>
        </div>
    );
}