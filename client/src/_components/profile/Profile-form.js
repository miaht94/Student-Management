import { Layout , Form, Avatar, Input, DatePicker, Button, Switch } from 'antd';
import { ConsoleSqlOutlined, UserOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useEffect} from 'react';
import { pickBy, identity } from 'lodash';
import {useRecoilState} from 'recoil';


import { useProfileAction } from '_actions';
import { alertBachAtom } from '_state';
import { useState } from 'react';

import locale from 'antd/es/date-picker/locale/vi_VN';
import { ConfigProvider } from 'antd';


export{ ProfileForm}

const Background = {
    backgroundImage : `url(${"https://user-images.githubusercontent.com/513929/53929982-e5497700-404c-11e9-8393-dece0b196c98.png"})`,
    backgroundSize : 'cover',
    backgroundPosition: 'center',
    height : '200px',
}
const avatarStyle = {
    backgroundColor: '#87d068',
    height: '100px',
    width: '100px',
    position: 'relative',
    top: '32%',
    left: '50%',
    transform: "translate(-50%, -50%)",
}

const dateFormat = 'DD/MM/YYYY';

const { Header, Content } = Layout;


function ProfileForm(props) {
    const profileAction = useProfileAction(); 
    const [form] = Form.useForm();
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const [passwordSwitch, setPasswordSwitch] = useState(false);
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    let data = props.data;
    let isTable = props.isTable;
    console.log(data);

    if (data == null) {
        profileAction.getMyProfile().then( newData =>{
                console.log('set new data here!!!!!');
                data = newData;
            }
        )
    }

    const onChangePassSwitch = () => {
        setPasswordSwitch(!passwordSwitch)
    }

    useEffect (() => {
        if (data !== undefined){
            // data = profile;
            form.resetFields();
        }
        
    },[data])

    // useEffect (() => {
    //     form.resetFields();
    // },[data])

    function formatDate(timestamp) {
        let formatedDateOfBirth = moment.utc(timestamp).format("DD/MM/YYYY") ;
        return formatedDateOfBirth
    }

    const cancelEdit = () => {
        setAlert({message: "Thành công", description: "Đã cập nhật lại các thông tin !"});
        form.resetFields();
    }     

    const handleSubmit = async () => {
        try {
			setSubmitButtonLoading(true)
            let values = await form.validateFields();
            const changedFields =  pickBy(values, identity);
			console.log("CHANGEFIELD")
			console.log(changedFields);
          	if(changedFields.date_of_birth) {
                let timestamp = moment(changedFields.date_of_birth, 'DD/MM/YYYY').format('x');
                console.log(timestamp);
                changedFields.date_of_birth = timestamp;
          	}
          	console.log(changedFields);
          	await profileAction.handleSubmit(changedFields, data.vnu_id, isTable);
			setSubmitButtonLoading(false);
        } catch (e) {
            setAlert({message: "Lỗi", description: e});
        }
    }

    return (
        (data)?
       
        <Layout>
            <Header style ={Background}> </Header>
            <Content>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    form = {form}
                >
                    <Avatar
                        style={avatarStyle}
                        src = {"https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"}
                        icon={<UserOutlined />}
                    />
                    <br/>
                    <Form.Item label="Vai trò" name = "role">
                        {data.role == 'teacher' ? "Cố vấn học tập" : "Sinh viên" }
                    </Form.Item>   
                    <Form.Item label="Họ và tên" name = "name">
                        <Input defaultValue = {data.name} />
                    </Form.Item>
                    
                    <Form.Item label="VNU ID" name = "vnu_id">
                        {(userData.role=='student') &&
                            <Input disabled defaultValue = {data.vnu_id} />
                        }
                        {(userData.role=='teacher') &&
                            <>
                            <Input defaultValue = {data.vnu_id} />
                            </>
                        }
                    </Form.Item>
                    <Form.Item label="Ngày sinh" name = "date_of_birth">
                        <DatePicker placeholder="Chọn ngày" defaultValue={moment(formatDate(data.date_of_birth), dateFormat)} format={dateFormat} />
                    </Form.Item>
                    <Form.Item label="Email" name = "email">
                        <Input defaultValue = {data.email} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại cá nhân" name = "phone_number">
                        <Input defaultValue = {data.phone_number} />
                    </Form.Item>
                    {   (data.role=='student') &&
                        <>
                        <Form.Item label="Số điện thoại phụ huynh" name = "parent_number">
                        <Input defaultValue = {data.parent_number} />
                        </Form.Item>
                        </>
                    }
                    
                    <Form.Item label="Địa chỉ" name = "location">
                        <Input defaultValue = {data.location} />
                    </Form.Item>
                    <Form.Item label="Đổi mật khẩu" name = "password_switch">
                    <Switch
                        checked={passwordSwitch}
                        checkedChildren="Có"
                        unCheckedChildren="Không"
                        onChange={onChangePassSwitch}
                    />
                    </Form.Item>
                    {passwordSwitch && <>
                        <Form.Item label="Mật khẩu cũ" name = "old_password">
                            <Input.Password defaultValue = {""} />
                        </Form.Item>
                        <Form.Item label="Mật khẩu mới" name = "new_password">
                            <Input.Password defaultValue = {""} />
                        </Form.Item>
                    </>}
                    
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit} loading={submitButtonLoading}>
                            Thay đổi
                        </Button>

                        <Button onClick = {cancelEdit} style = {{position : 'relative', left : '40px'}} >
                            Hoàn tác
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            
        </Layout> 
        :<></>
    )
}