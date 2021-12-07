import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal } from 'antd';
import './NewPost.css'
import { notification } from 'antd';
import { Input } from 'antd';
import { alertBachAtom } from '_state/alert_bach';
import { useRecoilState } from 'recoil';
const { TextArea } = Input;
  export default function NewPost(props) {
    const [open, setOpen] = React.useState(false);
    const [postContent, setPostContent] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [disableInput, setDisableInput] = React.useState(false);
    const handleSendPost = props.onSendPost ? props.onSendPost : ((postContent) => {});
    const [notification, setNotification] = useRecoilState(alertBachAtom)
    const onSend = () => {
        setLoading(true);
        setDisableInput(true);
        handleSendPost(postContent, handleClose);
        setNotification({message:"Thành công", description:"Đã đăng bài thành công"})
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setLoading(false);
        setDisableInput(false);
        setOpen(false);
    };

    const handleClickOk = () => {

    }
    const onChange = ({ target: { value } }) => {
        setPostContent( value );
      };
  
    return (
      <div>
          
        <Button onClick={handleClickOpen} style={{margin: 0,top: 'auto',right: 20,bottom: 20,left: 'auto',position: 'fixed',}} variant="contained" endIcon={<PostAddIcon />}>
                Đăng bài mới
        </Button>
        <Modal style={{borderRadius: "10px"}} title="Tạo bài đăng mới" visible={open} onOk={handleClickOk} onCancel={handleClose} footer={null}>
        <TextArea
          value={postContent}
          onChange={onChange}
          placeholder="Nhập nội dung bài đăng"
          autoSize={{ minRows: 3, maxRows: 5 }}
          disabled={disableInput}
        />
        <Grid container style={{marginTop: 10}}>
            <Grid item xs={9.6}></Grid>
           
            <Grid item xs={2}>
            <LoadingButton variant="contained" onClick={onSend} endIcon={<SendIcon />} loading={loading} loadingPosition="end">
                    Đăng
            </LoadingButton>
            </Grid>
        </Grid>
        </Modal>
      </div>
    );
  }
