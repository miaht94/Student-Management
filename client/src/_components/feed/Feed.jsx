import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { studentsAtom } from '_state';

import { StudentInfoList } from '_components/studentInfoList/StudentInfoList';

export { Feed };

function Feed() {

    const [student, setstudent] = useRecoilState(studentsAtom);
    return (
        <div className="p-4">
            <StudentInfoList data={student}/>
        </div>
    );
}
