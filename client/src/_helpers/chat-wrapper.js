import { useRecoilState } from 'recoil';
import { useFetchWrapper } from '_helpers';
import * as Configs from './Constant';
import { curChatPersonAtom, curListMessagesAtom, curListContactAtom, waitForUpdateLatestMsgAtom } from '../_state/chat';
import { alertBachAtom } from '../_state/alert_bach';
import { waitToAddContactAtom } from '../_state/chat';
function useChatWrapper(param) {
    const fetchWrapper = useFetchWrapper();
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const [curChatPerson, setCurChatPerson] = useRecoilState(curChatPersonAtom);
    const [curListMessages, setCurListMessage] = useRecoilState(curListMessagesAtom);
    const [curListContact, setCurListContact] = useRecoilState(curListContactAtom);
    const [waitingToAddContact, setWaitingToAddContact] = useRecoilState(waitToAddContactAtom)
    const [listUpdateLatestMsg, setListUpdateLatestMsg] = useRecoilState(waitForUpdateLatestMsgAtom);
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
            setCurListMessage([]);
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
        setCurListContact,
        getRecentContact,
        curChatPerson,
        setCurChatPerson,
        curListMessages,
        setCurListMessage,
        fetchCurListMessageById,
        curChatPersonAtom,
        curListMessagesAtom,
        curListContactAtom,
        waitToAddContactAtom,
        waitingToAddContact,
        setWaitingToAddContact,
        listUpdateLatestMsg,
        setListUpdateLatestMsg,
        waitForUpdateLatestMsgAtom
    }
}
export default useChatWrapper;