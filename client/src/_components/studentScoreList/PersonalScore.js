
import React ,{useEffect, useState} from 'react';
import { useStudentScoreAction } from '_actions';
import 'antd/dist/antd.css';
import { StudentScore } from '_components/studentScoreList'

export { PersonalScore };

function PersonalScore() {
    // let vnu_id = localStorage.getItem('userData');
    // console.log(vnu_id);

    // const [profile,setProfile] = useRecoilState(profileAtom);

    return (
        <div>
            <StudentScore vnu_id = {19020001} isPersonal={true} />
        </div>
    )
   
}