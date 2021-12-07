import React, { useEffect } from 'react';
import './Post.css'

// Icons
import Avatar from '@mui/material/Avatar';
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const defaultPost =
	{
		"_id": "617c0f13cbe8a4f53931e5e6",
		"from": {
			"location": "Ha Noi",
			"_id": "61767df3ec3b897290b3d8ce",
			"name": "Bach teach",
			"role": "teacher",
			"date_of_birth": 1633260836,
			"email": "doanxem2@gmail.com",
			"vnu_id": "5008601a-7f07-401d-b0e8-0cf7025431ee",
			"__v": 0
		},
		"content": "abcdefdawdwad",
		"comments": [
			"617c0f2acbe8a4f53931e604",
			"617c0f2bcbe8a4f53931e60e",
			"617c0f2ccbe8a4f53931e617"
		],
		"created_date": 1635520270450,
		"__v": 3
	}
const Comment = (props) => {
	return (
	<>
		<Grid item xs={0.1}></Grid>
		<Grid item xs={11.9}>
			<Grid container className="commentCtn">
				<Grid item xs={1} className="avatarComment">
					<Avatar {... stringAvatar(props.senderName)}  className="commentAvatar" />
				</Grid>
				<Grid item xs={10.9} className="postTopInfo">
					<Grid container >
						<div className="commentInfo">
							<h3 className='commentUsername'>{props.senderName}</h3>
							<p className='commentContent'>{props.commentContent}</p>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</>)
}
const Post = ({ postInstance, onSendComment, liked, onLikePost, showListLiked}) => {
	const userData = JSON.parse(localStorage.getItem("userData"));
    const itemData = [];
	const post = postInstance;
	const likedList = postInstance.liked;
	var likedForRender = "";
	const showListLiked_ = () => {
		showListLiked(post.liked);
	}
	var count = 0;
	for (var i of likedList) {
		count++;
		if (count < 3) {
			likedForRender+=i.name;
			likedForRender+=", "
		} else break;
	}
	if (likedList.length > 2)
		likedForRender += "... + " + (likedList.length - 2)
	if (likedForRender != "") {
		likedForRender+="đã thích";
	}
	
	const comments = post.comments;
	const textInput = React.useRef(null);
	const [hiddenComment, setHiddenComment] = React.useState(true);
	const likeOnClick = () => {
		console.log("Like post: " + post._id)
		onLikePost(post._id)
	};
	const [newCommentContent, setNewCommentContent] = React.useState("");
	const commentOnClick = () => {
		setHiddenComment(!hiddenComment);
	}
	const onKeyPressNewComment = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSendComment(textInput.current.innerHTML, post._id)
			textInput.current.innerHTML = "";
			// console.log(textInput.current.innerHTML)
		}
	}
	useEffect(() => {
		console.log(hiddenComment);
	}, [hiddenComment])
	var renderComment = [];
	for (var comment of comments) {

		renderComment.push(<Comment senderName={comment.from.name} commentContent={comment.content}></Comment>)
	}
    return (
        <Grid container className="post">
			<Grid item xs={0.1}></Grid>
            <Grid item xs={1} className="postTop">
                <Avatar {...stringAvatar(post.from.name)}  className="postAvatar" />
            </Grid>
            <Grid item xs={10.9} sm={10.9} className="postTopInfo">
              <Grid container className="postTopInfo">
                      <Grid item xs={12}><h5 className='postUsername'>{post.from.name}</h5></Grid>
                      <Grid item xs={12}><p className='postDate'>{new Date(post.created_date).toDateString()}</p></Grid>  
              </Grid>
            </Grid>
            <Grid item xs={0.1}></Grid>
			<Grid item xs={11.9}>
				<div className="postBottom">
					<p>{post.content}</p>
				</div>
			</Grid>
			<Grid item xs={0.5}></Grid>
			<Grid item xs={11.5} onClick={showListLiked_} style={{ color: "gray"}}>{likedForRender}</Grid>
			<Grid item xs={12}>
			<ImageList className='bach_imagelist' cols={3} rowHeight={164}>
              {itemData.map((item) => (
              	<ImageListItem key={item.img}>
					<img
					src={`${item.img}`}
					srcSet={`${item.img}`}
					alt={item.title}
					loading="lazy"
					/>
            	</ImageListItem>
      			))}
			</ImageList>
			</Grid>
            
			<Grid item xs={6} className="postOptions">
				<div className="postOption" onClick={likeOnClick}>
					{liked ? <ThumbUp className="like_post_btn" style={{marginLeft:"2px", color: "blue"}}/> : <ThumbUp className="like_post_btn" style={{marginLeft:"2px", color: "gray"}}/>}
                    <p style={{margin:"0px"}}>Like</p>
                </div>
			</Grid>
            <Grid item xs={6} className="postOptions">
				<div className="postOption" onClick={commentOnClick}>
                    <ChatBubbleOutline style={{marginLeft:"2px", paddingTop:"2px"}} />
                    <p style={{margin:"0px"}}>Comment</p>
                </div>
			</Grid>
			{!hiddenComment && <>
				{renderComment}
				<Grid item xs={0.1}></Grid>
				<Grid item xs={11.9}>
					<Grid container className="commentCtn">
						<Grid item xs={1} className="avatarCommentInput">
							<Avatar {... stringAvatar(userData.name ? userData.name : "You")} className="commentAvatar" />
						</Grid>
						<Grid item xs={10.9} className="inputCommentCtn">
							<Grid item xs={12} className="inputComment" placeholder={"Viết bình luận"} contentEditable={true} onKeyPress={onKeyPressNewComment} ref={textInput}></Grid>
						</Grid>
					</Grid>
				</Grid>
				</>
			}
			
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
export default Post;