import React, { useEffect } from 'react';

import { alertBachAtom } from '_state/alert_bach';
import { authAtom } from '_state';
import { useRecoilState } from 'recoil';
import { socketWrapper } from '../../../_helpers/socket-wrapper';
import { getRecoil, setRecoil } from "recoil-nexus";
import useSocketAction from '_actions/socket.action';
import { SportsHockey } from '@mui/icons-material';
export default function Socket(props) {
    let [auth, setAuth] = useRecoilState(authAtom)
    let socketAction = useSocketAction();
    var onNewPost = socketAction.onNewPost;
    var onNewMessage = socketAction.onNewMessage;
    useEffect(() => {
        socketWrapper.initConnection(auth);
        console.log("Socket khoi tao");
        socketWrapper.socket.on("NewPost", onNewPost)
        socketWrapper.socket.on("NewMessage", onNewMessage)
    }, [])
    
    return (
      <></>
    );
}
