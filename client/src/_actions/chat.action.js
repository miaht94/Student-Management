import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { alertBachAtom } from '../_state/alert_bach';
import useChatWrapper from '_helpers/chat-wrapper';
function useChatAction() {
    // setAlert in form  setAlert(messageTitle, description)
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const chatWrapper = useChatWrapper();
    
    async function getRecentContact() {
        await chatWrapper.getRecentContact();
    }

    async function getCurChatMessageById(vnu_id) {
        await chatWrapper.fetchCurListMessageById(vnu_id);
    }
    return {getRecentContact, getCurChatMessageById}
}  

export default useChatAction;
