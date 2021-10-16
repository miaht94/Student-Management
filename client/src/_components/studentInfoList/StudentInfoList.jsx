import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { StudentInfoList };

function StudentInfoList() {
    const auth = useRecoilValue(authAtom);

    return (
        <div className="p-4">
            <div className="container">
                <h1>This is Student Information List</h1>
            </div>
        </div>
    );
}
