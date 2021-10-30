import { Layout , Form, Avatar, Input, DatePicker, Button} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useEffect} from 'react';
import { pickBy, identity } from 'lodash';
import {useRecoilValue} from 'recoil';
import { profileAtom } from '_state';

import { useProfileAction } from '_actions';

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

const { Header, Footer, Content } = Layout;

function ProfileForm(props) {
    const profileAction = useProfileAction(); 
    const profile = useRecoilValue(profileAtom);
    const [form] = Form.useForm();
    let data = props.data;

    useEffect (() => {
        if (profile !== undefined){
            data = profile;
            form.resetFields();
        }
    },[profile])

    function formatDate(timestamp) {
        let formatedDateOfBirth = moment(timestamp, 'X').format("DD/MM/YYYY") ;
        debugger;  
        return formatedDateOfBirth
    }


    const cancelEdit = () => {
        form.resetFields();
    }     

    const handleSubmit = () => {
       form.validateFields()
        .then((values) => {
        //   form.resetFields();
          const changedFields =  pickBy(values, identity);
          if(changedFields.date_of_birth) {
                let timestamp = moment(changedFields.date_of_birth).add(0,'hours').add(0, 'minutes').add(0, 'seconds').format("X");
                changedFields.date_of_birth = timestamp;
          }
          console.log(changedFields);
          profileAction.handleSubmit(changedFields,data.vnu_id);
        });
    }

    return (
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
                        src = {"https://vn.portal-pokemon.com/play/resources/pokedex/img/pm/70a91d7bed9893ec5e1bff2f44c52178a41f74e0.png"}
                        icon={<UserOutlined />}
                    />
                    <br/>
                    <Form.Item label="Name" name = "name">
                        <Input defaultValue = {data.name} />
                    </Form.Item>
                    <Form.Item label="Vnu_id" name = "vnu_id">
                        <Input defaultValue = {data.vnu_id} />
                    </Form.Item>
                    <Form.Item label="Date of Birth " name = "date_of_birth">
                        <DatePicker defaultValue={moment(formatDate(data.date_of_birth), dateFormat)} format={dateFormat} />
                    </Form.Item>
                    <Form.Item label="Email" name = "email">
                        <Input defaultValue = {data.email} />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit}>
                            Submit
                        </Button>

                        <Button onClick = {cancelEdit} style = {{position : 'relative', left : '40px'}}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            
        </Layout>
    )
}