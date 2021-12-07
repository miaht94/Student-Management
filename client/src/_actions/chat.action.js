import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { alertBachAtom } from '../_state/alert_bach';
import useChatWrapper from '_helpers/chat-wrapper';
import { useAuthWrapper } from '_helpers';
import { useFetchWrapper } from '_helpers';
import { socketWrapper } from '_helpers/socket-wrapper';
import { loadingVisibleAtom } from '_state';
import * as Configs from '_helpers/Constant';
import { curListContactAtom } from '_state/chat';
import { message } from 'antd';
function useChatAction() {
    // setAlert in form  setAlert(messageTitle, description)
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const [loadingVisible, setLoadingVisible] = useRecoilState(loadingVisibleAtom);
    const authWrapper = useAuthWrapper();
    const chatWrapper = useChatWrapper();
    const fetcher = useFetchWrapper();
    async function getRecentContact() {
        setLoadingVisible(true);
        await chatWrapper.getRecentContact();
        setLoadingVisible(false);
    }

    async function getCurChatMessageById(vnu_id) {
        setLoadingVisible(true);
        await chatWrapper.fetchCurListMessageById(vnu_id);
        setLoadingVisible(false)
    }

    async function onSendMessage(content) {
        let uInfo =  await authWrapper.getUserInfo();
        
        let message = 
        {
            to : chatWrapper.curChatPerson,
            message: content
        }
        console.log(message)
        socketWrapper.socket.emit("NewMessage", message)
    }

    function findContactInList(vnu_id) {
        let count = 0;
        if (chatWrapper.curListContact)
        for (var i of chatWrapper.curListContact) {
            if (i.contact.vnu_id === vnu_id)
                return {element: i, index : count};
        count++;
        }
        return {element: null, index: null};
    }

    function updateLatestMsg(latest) {
        let temp = findContactInList(latest.vnu_id);
        let i = temp.element;
        let index = temp.index;
        let newContact = {...i};
        newContact.latest_message = latest.latest_message;
        let curListContact_ = [...chatWrapper.curListContact];
        curListContact_[index] = newContact;
        chatWrapper.setCurListContact(curListContact_);
    }

    async function addContactToList(obj) {
        let vnu_id = obj.vnu_id
        let form = {contact : null, latest_message : null, latest_sender : null}
        if (obj.message) {
            form.latest_message = {message: obj.message.message}
            form.latest_sender = message.isSender ? "isMe" : "notMe"
        }
        
        if (findContactInList(vnu_id).element) return;
        try {
            
            let res = await fetcher.get(Configs.HOST_NAME + Configs.API_PATH.PROFILE_BY_ID.replace(":profileId", vnu_id));
            if (!res.ok) {
                // debugger
                setAlert({message: "Loi", description: "Link khong hop le"})
                return;
            }
            form.contact = await res.json(); 
            let newList = chatWrapper.curListContact ? [...chatWrapper.curListContact] : [];
            newList.push(form);
            chatWrapper.setCurListContact(newList);
        } catch(e) {
            setAlert({message: "Loi", description:"Khong the them contact. Err : " + e.toString()});
        }
        

    }

    return {getRecentContact, getCurChatMessageById, onSendMessage, addContactToList, updateLatestMsg}
}  

export default useChatAction;
