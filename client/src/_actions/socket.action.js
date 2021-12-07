import { useRecoilState } from 'recoil';
import { alertBachAtom } from '../_state/alert_bach';
import useChatWrapper from '_helpers/chat-wrapper';
import { useAuthWrapper } from '_helpers';
import { socketWrapper } from '_helpers/socket-wrapper';
import { feedPageAtom } from '_state/feed_page';
import { getRecoil, setRecoil } from "recoil-nexus";
import { useFeedPageWrapper } from '_helpers/feed_page_wrapper';
import { authAtom } from '_state';
import { waitForUpdateLatestMsgAtom, waitToAddContactAtom } from '_state/chat';
function useSocketAction() {
    let feedPageWrapper = useFeedPageWrapper();
    let chatWrapper = useChatWrapper();
    let [alert, setAlert] = useRecoilState(alertBachAtom);

    function onConnected() {
        // debugger
        socketWrapper.isConnected = true
    }
    function onNewPost(newPost) {
 
        var feedPageState = getRecoil(feedPageAtom);
        let posts = [...feedPageState.posts];
            posts.push(newPost);
            setRecoil(feedPageAtom, {...feedPageWrapper.feedPageState, posts:posts})
    }
    function onNewComment(newComment) {
        var feedPageState = getRecoil(feedPageAtom);
        feedPageState = JSON.parse(JSON.stringify(feedPageState))
        var new_comment = newComment.new_comment;
        var postId = newComment.postId;
        let posts = [...feedPageState.posts];
        for (var i of posts) {
            if (i._id == postId) {
                var newComments = [...i.comments]
                newComments.push(new_comment);
                i.comments = newComments;
                break;
            }
        }
        setRecoil(feedPageAtom, {...feedPageWrapper.feedPageState, posts:posts})
        // console.log("new comment bro");
    }
    function onUpdatePost(newPost) {
        // debugger
        var feedPageState = getRecoil(feedPageAtom);
        feedPageState = JSON.parse(JSON.stringify(feedPageState))
        var postId = newPost._id;
        let posts = [...feedPageState.posts];
        let newPosts = [];
        for (var i of posts) {
            if (i._id == postId) {
                newPosts.push(newPost)
                continue;
            }
            newPosts.push(i);
        }
        setRecoil(feedPageAtom, {...feedPageWrapper.feedPageState, posts:newPosts})
    }
    function onNewMessage(message) {
        // debugger
        if (!message.selfSend) {
            setAlert({message: `Tin nhắn mới từ: ${message.from.name}`, description: message.message})
        }
            
        if (message.from.vnu_id == getRecoil(chatWrapper.curChatPersonAtom) || message.to.vnu_id == getRecoil(chatWrapper.curChatPersonAtom)) {
            let newListMessages = [...(getRecoil(chatWrapper.curListMessagesAtom))];
            newListMessages.push(message);
            setRecoil(chatWrapper.curListMessagesAtom, newListMessages)
        }

        if (message.newContact && !message.isSender) {
            let listToAdd = getRecoil(waitToAddContactAtom) ? [...(getRecoil(waitToAddContactAtom))] : [];
            listToAdd.push({vnu_id : message.from.vnu_id, message:message})
            setRecoil(waitToAddContactAtom, listToAdd);
        }

        let newUpdate = {
            vnu_id: message.isSender ? message.to.vnu_id : message.from.vnu_id,
            latest_message: message,
            latest_sender:  message.isSender ? "isMe" : "notMe"
        }
        // debugger
        let listUpdating = getRecoil(waitForUpdateLatestMsgAtom) ? [...(getRecoil(waitForUpdateLatestMsgAtom))] : [];
        listUpdating.push(newUpdate);
        setRecoil(waitForUpdateLatestMsgAtom, listUpdating)
        console.log(message);
    }
    return {onNewPost, onNewMessage, onConnected, onNewComment, onUpdatePost}
}

export default useSocketAction;

