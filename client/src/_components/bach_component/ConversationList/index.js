import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import { useParams } from 'react-router-dom';
import ToolbarButton from '../ToolbarButton';
import { useFetchWrapper } from '_helpers';
import fakeData from './conservationlistFake';
import './ConversationList.css';
import useChatAction from '_actions/chat.action';
import useChatWrapper from '_helpers/chat-wrapper';
import { Link } from 'react-router-dom';
export default function ConversationList(props) {
  const fetcher = useFetchWrapper();
  const chatAction = useChatAction();
  const chatWrapper = useChatWrapper();
 
  useEffect(() => {
    chatAction.getRecentContact().then((res) => {
      props.setLoaded(true);
    });
  },[])


  useEffect(() => {
    async function addContact() {
      if (chatWrapper.waitingToAddContact && chatWrapper.waitingToAddContact.length > 0) {
        for (var i of chatWrapper.waitingToAddContact) {
          await chatAction.addContactToList(i);
        }
      }
    }

    addContact().then(() => {
      chatWrapper.setWaitingToAddContact(null);
    })
    console.log("AAAAAAAAAAAAA")
  },[chatWrapper.waitingToAddContact])

  useEffect(() => {

	if (!chatWrapper.listUpdateLatestMsg) return;
    for (var i of chatWrapper.listUpdateLatestMsg) {
		chatAction.updateLatestMsg(i)
	}	
  },[chatWrapper.listUpdateLatestMsg])
  let conservationsList = chatWrapper.curListContact ? chatWrapper.curListContact.map(result => {
    return {
      vnu_id: result.contact.vnu_id,
      name: result.contact.name,
      text: result.latest_message ? result.latest_message.message : "Chua co tin nhan nao"
    };
  }) : []; 
    return (
      <div className="conversation-list">
        <Toolbar
          title="Nhắn tin"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        {
          conservationsList.map(conversation =>
            <Link to={`/chat/${conversation.vnu_id}`}>
              <ConversationListItem
                key={conversation.name}
                data={conversation}
                picked={conversation.vnu_id ===  chatWrapper.curChatPerson}
              />
            </Link>
          )
        }
      </div>
    );
}