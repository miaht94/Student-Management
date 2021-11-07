import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
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
    chatAction.getRecentContact();
  },[])
  let conservationsList = chatWrapper.curListContact ? chatWrapper.curListContact.map(result => {
    return {
      vnu_id: result.contact.vnu_id,
      name: result.contact.name,
      text: result.latest_message.message
    };
  }) : []; 
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conservationsList.map(conversation =>
            <Link to={`/chat/${conversation.vnu_id}`}>
              <ConversationListItem
                key={conversation.name}
                data={conversation}
              />
            </Link>
          )
        }
      </div>
    );
}