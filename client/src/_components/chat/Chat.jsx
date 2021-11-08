import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Messenger from '_components/bach_component/Messenger';
import { PrivateRoute } from '_components/PrivateRoute';
import { authAtom } from '_state';

export { Chat };

function Chat() {
    const auth = useRecoilValue(authAtom);
    return (
        <div style={{height:"640px"}}>
            <Messenger></Messenger>
            
        </div>
    );
}
