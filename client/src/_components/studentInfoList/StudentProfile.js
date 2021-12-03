import { useRecoilState, useRecoilValue } from 'recoil';

import { studentsAtom } from '_state';
import { ProfileForm } from '_components/profile'

export { StudentProfile };

function StudentProfile(props) {
    const [students, setStudents] = useRecoilState(studentsAtom);
    let studentId = props.Id;
    // console.log(students , 'id ', studentId);
    let data = students.find(student => student._id === studentId);
    return (
        <ProfileForm data = {data} isTable = {true}/>
    );
}
