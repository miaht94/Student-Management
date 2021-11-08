import React, { useState } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import { PrivateRoute } from '_components/PrivateRoute';
import { Switch } from 'react-router-dom';
export default function Messenger(props) {
  const [conversationLoaded, setConservationLoaded] = useState(false)
    return (
      <div className="messenger">
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className="scrollable sidebar">
          <ConversationList setLoaded={setConservationLoaded}/>
        </div>

        <div className="scrollable content">
          {conversationLoaded && 
          <Switch>
            <PrivateRoute exact path="/chat/:vnu_id" component={MessageList} />
          </Switch>
        }
        
        
          
        </div>
      </div>
    );
}