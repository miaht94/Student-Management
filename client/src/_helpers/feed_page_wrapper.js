import { useRecoilState } from 'recoil';
import NewPost from '_components/bach_component/Post/NewPost';
import { useFetchWrapper } from '_helpers';
import { feedPageAtom, isInitiatedSocketFeed } from '_state/feed_page';
import {useClassWrapper} from './class-wrapper';
import * as Configs from './Constant'
import { socketWrapper } from './socket-wrapper';
import { getRecoil, setRecoil } from "recoil-nexus";
function useFeedPageWrapper() {
    let classWrapper = useClassWrapper();
    let fetcher = useFetchWrapper();
    let [feedPageState, setFeedPageState] = useRecoilState(feedPageAtom)
    
    
    async function getAllPosts() {
      
        console.log(Configs.HOST_NAME + Configs.API_PATH.GET_ALL_POSTS.replace(":classId", classWrapper.curClass.class_id));
        let response = await fetcher.get(Configs.HOST_NAME + Configs.API_PATH.GET_ALL_POSTS.replace(":classId", classWrapper.curClass.class_id), null, null);
        response = await response.json()
        if (response.status != "Error") {
            let temp = {...feedPageState};
            temp.posts = response.message;
            setFeedPageState(temp);
        }
        return response;
    }
    return {
        feedPageState : feedPageState,
        getAllPosts: getAllPosts,
        setFeedPageState: setFeedPageState

    }
}
export { useFeedPageWrapper };