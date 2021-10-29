import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import { useFetchWrapper } from '_helpers';

export default function ConversationList(props) {
  const fetchWrapper = useFetchWrapper();
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])

  async function getConversations() {
    var conversations = [];
    const conversation = {
      photo : "https://static.wikia.nocookie.net/projectsekai/images/3/3e/Miku_ln_%28icon%29.png",
      name : "Hatsune Miku",
      text : "Hello"
    }
    conversations.push(conversation);
    conversations.push(conversation);
    conversations.push(conversation);
    setConversations(conversations);
  }

    return (
      <div className="conversation-list">
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}