import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import { feedPageAtom } from '_state/feed_page';
import {useClassWrapper} from './class-wrapper';

import * as Configs from './Constant'

export { useFeedPageWrapper };
function useFeedPageWrapper() {
    let classWrapper = useClassWrapper();
    let [feedPageState, setFeedPageState] = useRecoilState(feedPageAtom);
    let fetcher = useFetchWrapper();
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
        getAllPosts: getAllPosts

    }
}
