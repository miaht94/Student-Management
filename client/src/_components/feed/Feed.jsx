import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { studentsAtom } from '_state';
import {useClassWrapper} from '../../_helpers/class-wrapper';
import { StudentInfoList } from '_components/studentInfoList/StudentInfoList';
import {useFeedPageWrapper} from '../../_helpers/feed_page_wrapper';
import { useEffect, useState } from 'react';
import Post from '_components/bach_component/Post/Post';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Button from '@mui/material/Button';
import NewPost from '_components/bach_component/Post/NewPost';
import { useFeedActions } from '_actions/feed.actions';
export { Feed };

function Feed() {

    const [student, setstudent] = useRecoilState(studentsAtom);
    const feedPageWrapper = useFeedPageWrapper();
    const curClass = useClassWrapper().curClass;
    const [loaded, setloaded] = useState(false);
    const feedAction = useFeedActions();
    console.log(curClass);
    useEffect(() => {
        async function fetchMyAPI() {
            await feedPageWrapper.getAllPosts();
            console.log(feedPageWrapper.feedPageState)
          }
        fetchMyAPI().then(() => {
            console.log("fetch done")
            setloaded(true)
        })
        
    }, [])
    var renderPosts = [];
    // useEffect(() => {},[feedPageWrapper])
    let temp = [...feedPageWrapper.feedPageState.posts]
    temp.sort((a,b)=> {
        if (a.created_date && b.created_date) {
            
            if (a.created_date > b.created_date) return -1;
            if (a.created_date == b.created_date) return 0;
            else return 1;
        } else return 0;
    })
    if (loaded) {
        console.log("Feed: " , feedPageWrapper.feedPageState)
        for (var i = 0; i < temp.length; i++) {

            renderPosts.push(
                <Post postInstance={temp[i]}></Post>
            )
        };
    }
    
    return ( <>
        {(loaded) && <>
            <NewPost onSendPost={feedAction.sendPost}/>
            <div style={{paddingRight:"300px", paddingLeft:"230px"}}>
                {renderPosts}
            </div>
        </>
        }
    </>
        
    )
}
