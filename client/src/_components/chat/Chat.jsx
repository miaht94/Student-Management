import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { Chat };

function Chat() {
    const auth = useRecoilValue(authAtom);
    return (
        <div className="p-4">
            <div className="container">
                <h1>This is Chat</h1>
            </div>
        </div>
    );
}
