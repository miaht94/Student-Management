import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import Messenger from '_components/bach_component/Messenger';
import { PrivateRoute } from '_components/PrivateRoute';
import { authAtom } from '_state';
import { socketWrapper } from '_helpers/socket-wrapper';
import { useAuthWrapper } from '_helpers';
import { useRecoilState } from 'recoil';
import { socketConnected } from '_state/socket';
export { Chat };

function Chat() {
    const auth = useRecoilValue(authAtom);
    const [isSocketConnected, setSocketConnected] = useRecoilState(socketConnected)
    const authWrapper = useAuthWrapper();
    useEffect(() => {
        console.log("Socket Status: " + isSocketConnected)
        if (auth && !isSocketConnected) {
            socketWrapper.initConnection(auth);
        }
    }, [])
    return  <>
        {isSocketConnected &&
        <div style={{height:"640px"}}>
            <Messenger></Messenger>
        </div>
        }
        </>
  
}
