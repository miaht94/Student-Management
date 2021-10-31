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

const Post = ({ postInstance, onClickComment_ }) => {
    const itemData = [];
	const post = postInstance ? postInstance : defaultPost;
	const [hiddenComment, setHiddenComment] = React.useState(true);
	const likeOnClick = null;
	const onClickComment = onClickComment_ ? onClickComment_ : ((postId) =>{}) // (postId) => {etc ...}
	const commentOnClick = () => {
		setHiddenComment(!hiddenComment);
		onClickComment(post._id)
	}
	useEffect(() => {
		console.log(hiddenComment);
	}, [hiddenComment])
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
                    <ThumbUp style={{marginLeft:"2px"}}/>
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
				<Grid item xs={0.1}></Grid>
				<Grid item xs={11.9}>
					<Grid container className="commentCtn">
						<Grid item xs={1} className="avatarComment">
							<Avatar {... stringAvatar("abc")}  className="commentAvatar" />
						</Grid>
						<Grid item xs={10.9} className="postTopInfo">
							<Grid container >
								<div className="commentInfo">
									<h3 className='commentUsername'>abc</h3>
									<p className='commentContent'>{123} giờ đó là quá sớm rồi.</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={0.1}></Grid>
				<Grid item xs={11.9}>
					<Grid container className="commentCtn">
						<Grid item xs={1} className="avatarComment">
							<Avatar {... stringAvatar("abc")} className="commentAvatar" />
						</Grid>
						<Grid item xs={10.9} className="postTopInfo">
							<Grid container >
								<div className="commentInfo">
									<h3 className='commentUsername'>abc</h3>
									<p className='commentContent'>{123} giờ đó là quá sớm rồi.</p>
								</div>
								
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={0.1}></Grid>
				<Grid item xs={11.9}>
					<Grid container className="commentCtn">
						<Grid item xs={1} className="avatarCommentInput">
							<Avatar {... stringAvatar("Y o u")} className="commentAvatar" />
						</Grid>
						<Grid item xs={10.9} className="inputCommentCtn">
							<Grid item xs={12} className="inputComment" placeholder={"Viết bình luận"} contentEditable={true}></Grid>
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