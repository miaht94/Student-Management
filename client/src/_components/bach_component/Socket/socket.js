import React, { useEffect } from 'react';

import { alertBachAtom } from '_state/alert_bach';
import { authAtom } from '_state';
import { useRecoilState } from 'recoil';
import { socketWrapper } from '../../../_helpers/socket-wrapper';
import { useFeedPageWrapper } from '_helpers/feed_page_wrapper';
import { feedPageAtom } from '_state/feed_page';
import { getRecoil, setRecoil } from "recoil-nexus";
export default function Socket(props) {
    let [auth, setAuth] = useRecoilState(authAtom)
    let feedPageWrapper = useFeedPageWrapper();
    var onNewPost = ((newPost) => {
        var feedPageState = getRecoil(feedPageAtom);
        let posts = [...feedPageState.posts];
            posts.push(newPost);
            setRecoil(feedPageAtom, {...feedPageWrapper.feedPageState, posts:posts})
    })
    useEffect(() => {
        debugger
        socketWrapper.initConnection(auth);
        console.log("Socket khoi tao");
        socketWrapper.socket.on("NewPost", onNewPost)
    }, [])
    
    return (
      <></>
    );
}
