import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import * as Configs from './Constant';
import { curChatPersonAtom, curListMessagesAtom, curListContactAtom } from '../_state/chat';
import { alertBachAtom } from '../_state/alert_bach';

function useChatWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const [curChatPerson, setCurChatPerson] = useRecoilState(curChatPersonAtom);
    const [curListMessages, setCurListMessage] = useRecoilState(curListMessagesAtom);
    const [curListContact, setCurListContact] = useRecoilState(curListContactAtom);
    async function getRecentContact() {
        try {
     
            let res = await fetchWrapper.get(Configs.HOST_NAME + Configs.API_PATH.RECENT_CONTACT);
            if (res.ok) {
                res = await res.json();
                setCurListContact(res.message);
            }
            return res;
        } catch (e) {
            setAlert({message: "Fetch Error", description: e.toString()})
        }
        
    }

    async function fetchCurListMessageById(vnu_id) {
        try {
            let res = await fetchWrapper.get(Configs.HOST_NAME + Configs.API_PATH.MESSAGES_BY_VNU_ID.replace(":otherVNUId", vnu_id));
            if (res.ok) {
                res = await res.json();
                setCurChatPerson(vnu_id);
                setCurListMessage(res.message);
            }
            
            return res;
        } catch (e) {
            setAlert({message: "Fetch Error", description: e.toString()})
        }
    }
    return {
        curListContact,
        getRecentContact,
        curChatPerson,
        setCurChatPerson,
        curListMessages,
        setCurListMessage,
        fetchCurListMessageById
    }
}
export default useChatWrapper;