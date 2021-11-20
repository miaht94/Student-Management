import { authAtom } from '_state';
import { useRecoilState, useRecoilValue } from 'recoil';

import { scoreAtom } from '_state';
import { StudentScoreTable } from '_components/studentScoreList';

export { StudentScoreList };


function StudentScoreList() {
    const [score, setScore] = useRecoilState(scoreAtom);
    return (
        <div className="p-4">
            <StudentScoreTable data = {score} />
        </div>
    );
}
