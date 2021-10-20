import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { studentsAtom } from '_state';

import { StudentInfoList } from '_components/studentInfoList/StudentInfoList';

export { Feed };

function Feed() {

    const [student,setStudent] = useRecoilValue(studentsAtom);

    return (
        <div className="p-4">
            <StudentInfoList data={student}/>
        </div>
    );
}
