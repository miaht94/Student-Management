import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Avatar from '@mui/material/Avatar';
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
import { Modal, Row, Col } from 'antd';
import './Feed.css'
export { Feed };

function Feed() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [student, setstudent] = useRecoilState(studentsAtom);
    const feedPageWrapper = useFeedPageWrapper();
    const curClass = useClassWrapper().curClass;
    const [loaded, setloaded] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [curModalContent, setCurModalContent] = useState([])
    const showPostLiked = (list) => {
        setCurModalContent(list);
        setModalVisible(true);
    }
    const handleOk = () => {
        setModalVisible(false);
    };
    const handleCancel = () => {
    setModalVisible(false);
    };
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
        // socketWrapper.socket.on("NewPost", onNewPost)
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
            var liked = false;
            for (var j of temp[i].liked) {
                if (j.vnu_id == userData.vnu_id) {
                    liked = true;
                    break;
                }
                    
            }
            renderPosts.push(
                <Post postInstance={temp[i]} onSendComment={feedAction.sendComment} liked={liked} onLikePost={feedAction.likePost} showListLiked={showPostLiked}></Post>
            )
        };
    }
    var modalRender = [];
    for (var i of curModalContent) {
        modalRender.push(<ModalElement name={i.name}></ModalElement>)
    }
    return ( <>
        {(loaded) && <>
            <NewPost onSendPost={feedAction.sendPost}/>
            <div style={{paddingRight:"300px", paddingLeft:"230px"}}>
                {renderPosts}                
            </div>
            {renderPosts.length == 0 && 

            <h1 className='NoPost'>Hiện chưa có bài đăng nào cả</h1>}
        </>
        }
        <Modal title="Đã thích" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {curModalContent.length>0 ?  
            <>
                {modalRender}
            </>
                : " "}
        </Modal>
    </>
        
    )
}

function ModalElement(props) {
    return (
        <Grid container className="commentCtn">
        <Grid item xs={1} className="avatarComment">
            <Avatar {... stringAvatar(props.name)}  className="commentAvatar" />
        </Grid>
        <Grid item xs={0.3}>
        </Grid>
        <Grid item xs={10.7} className="postTopInfo">
            <Grid container >
                <div>
                    <h3 className='commentUsername'>{props.name}</h3>
                </div>
            </Grid>
        </Grid>
    </Grid>
    )
}
function stringToColor(string) {
	let hash = 0;
	let i;
  
	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
	  hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
  
	let color = '#';
  
	for (i = 0; i < 3; i += 1) {
	  const value = (hash >> (i * 8)) & 0xff;
	  color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */
  
	return color;
  }
function stringAvatar(name) {
	let a = name.split(' ')[0]
	return {
	  sx: {
		bgcolor: stringToColor(name),
	  },
	  children: `${a}`,
	};
  }