import React, { useEffect } from 'react';

import { alertBachAtom } from '_state/alert_bach';
import { authAtom } from '_state';
import { useRecoilState } from 'recoil';
import { socketWrapper } from '../../../_helpers/socket-wrapper';
import { getRecoil, setRecoil } from "recoil-nexus";
import useSocketAction from '_actions/socket.action';
import { SportsHockey } from '@mui/icons-material';
import { socketConnected } from '_state/socket';

export default function Socket(props) {
    let [auth, setAuth] = useRecoilState(authAtom)
    let socketAction = useSocketAction();
    var onNewPost = socketAction.onNewPost;
    var onNewMessage = socketAction.onNewMessage;
    var onNewComment = socketAction.onNewComment;
    var onConnected = socketAction.onConnected;
    var onUpdatePost = socketAction.onUpdatePost;
    let [isSocketConnected, setSocketConnected] = useRecoilState(socketConnected)
    useEffect(() => {
        if (!socketWrapper.initiated) {
          socketWrapper.initConnection(auth);
        } 
        console.log("Socket khoi tao");
        socketWrapper.socket.removeAllListeners()
        socketWrapper.socket.on("connect", onConnected)
        socketWrapper.socket.on("NewPost", onNewPost)
        socketWrapper.socket.on("NewComment", onNewComment)
        socketWrapper.socket.on("NewMessage", onNewMessage)
        socketWrapper.socket.on("UpdatePost", onUpdatePost)
        let id = setInterval(() => {
          
          if (socketWrapper.isConnected){
            console.log("Socket init status " + socketWrapper.initiated)
            console.log("Socket connect status" + socketWrapper.isConnected)
            setSocketConnected(true)
            clearInterval(id)
          }
        }, 300)
    }, [])
    
    return (
      <></>
    );
}
