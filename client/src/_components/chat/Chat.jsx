import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Chat.css';

import { Layout} from 'antd';

export { Chat };

function Chat(props) {
    const { Sider, Content } = Layout;
    const auth = useRecoilValue(authAtom);
    
    return (
        
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          <MessageList />
        </div>
      </div>   
    );
}

// const ProfileSchema = new Schema ({
//     name:{type: String},
//     role:{type: String, enum: {
//         values: ['student', 'teacher'],
//         message: 'Role {VALUE} is not supported'
//     }},
//     location: {type: String, default:"Ha Noi"},
//     date_of_birth: {type: Date, default: new Date().getTime()},
//     email: { type: String, set: toLower },
//     vnu_id: {type: String, index: { unique: true }, dropDups: true},
// });

// const MessageSchema = new Schema({
//     from: {type: ObjectId, ref: Configs.DB_SCHEMA.USER, required:true},
//     to: {type: ObjectId, ref: Configs.DB_SCHEMA.USER, required:true},
//     message: {type: String, default: ""},
//     createdDate: {type: Number, required:true}
// });      
