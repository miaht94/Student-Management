
import { authAtom, usersAtom, userAtom } from '_state';
import { alertBachAtom } from '_state/alert_bach';
import { useClassWrapper } from '_helpers';
import { useFetchWrapper } from '_helpers';
import * as Configs from '../_helpers/Constant';
import {useRecoilState} from 'recoil';
import { useFeedPageWrapper } from '_helpers/feed_page_wrapper';
export { useFeedActions };

function useFeedActions() {
    const classWrapper = useClassWrapper();
    const fetcher = useFetchWrapper();
    const [notification, setNotification] = useRecoilState(alertBachAtom);
    let feeder = useFeedPageWrapper();
    async function sendPost(postContent, callback) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("content", postContent);
        let response = await fetcher.post(Configs.HOST_NAME + Configs.API_PATH.POST_TO_FEED.replace(":classId", classWrapper.curClass.class_id), "application/x-www-form-urlencoded", urlencoded);
        response = await response.json();
        if (response.status == "Success") {
            setNotification(response.status, response.message);
        }
        
        callback();
    }
    async function sendComment(commentContent, postId) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("content", commentContent);
        // debugger
        let response = await fetcher.post(Configs.HOST_NAME + Configs.API_PATH.COMMENT_TO_POST.replace(":classId", classWrapper.curClass.class_id).replace(":postId", postId), "application/x-www-form-urlencoded", urlencoded);
        response = await response.json();
        if (response.status != "Success") {
            setNotification(response.status, response.message);
        }
    }

    async function likePost(postId) {
        var urlencoded = new URLSearchParams();
        let response = await fetcher.post(Configs.HOST_NAME + Configs.API_PATH.LIKE_POST.replace(":classId", classWrapper.curClass.class_id).replace(":postId", postId), null, null);
        response = await response.json();
        if (response.status != "Success") {
            setNotification(response.status, response.message);
        }
    }
    return {
        sendPost: sendPost,
        sendComment: sendComment,
        likePost: likePost
    }
}