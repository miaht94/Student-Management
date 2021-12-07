import React, {useEffect, useRef, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import useChatAction from '_actions/chat.action';
import useChatWrapper from '_helpers/chat-wrapper';
import {useParams} from 'react-router-dom';
import { useAuthWrapper } from '_helpers';
import './MessageList.css';
import axios from 'axios';
export default function MessageList(props) {
  let {vnu_id} = useParams();
  const [fetchDone, setFetchDone] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const messageEnd = useRef(null);
  const chatAction = useChatAction();
  const chatWrapper = useChatWrapper();
  const NOT_MY_USER_ID = vnu_id
  let [targetName, setTargetName] = useState('');
  useEffect(() => {

    setIsHidden(true);
    if (vnu_id)
    chatAction.addContactToList({vnu_id : vnu_id}).then(() => {
      chatAction.getCurChatMessageById(vnu_id).then(res => {
        setFetchDone(true);
        setIsHidden(false);
      });
    })
    
    async function getTargetName(vnu_id) {
      // debugger
      if (vnu_id) {
        let res = await axios.get('http://localhost:3000/api/profile/' + vnu_id)
        res = res.data;
        // debugger
        setTargetName(res.name);
    }
    }
    getTargetName(vnu_id)
  },[vnu_id])
  useEffect(() => {
    
    return () => {
      chatWrapper.setCurChatPerson(null);
    }
  }, [])
  let messages = [];

  if (fetchDone)
    messages = chatWrapper.curListMessages &&  chatWrapper.curListMessages.length > 0 ? chatWrapper.curListMessages.map(result => {
    
    return {
      id: result._id,
      author: result.from.vnu_id,
      message: result.message,
      timestamp: new Date(result.createdDate)
    };
  }) : []; 
 
  useEffect(() => {
    messageEnd.current.scrollIntoView()
  }, [chatWrapper.curListMessages])
  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];
    
    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author !== NOT_MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
       
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">
        <Toolbar
        className="conversation-title-toolbar"
          title={"Trao đổi với " + targetName}
        />

        <div  className="message-list-container">{renderMessages()}
          <div style={{ float:"left", clear: "both" }}
              ref={messageEnd}>
          </div>
        </div>
        <Compose onSendMessage={chatAction.onSendMessage} visible={!isHidden}/>
        
      </div>
    );
}

 // const getMessages = () => {
  //    var tempMessages = [
  //       {
  //         id: 1,
  //         author: 'apple',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 2,
  //         author: 'orange',
  //         message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 3,
  //         author: 'orange',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 4,
  //         author: 'apple',
  //         message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 5,
  //         author: 'apple',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 6,
  //         author: 'apple',
  //         message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 7,
  //         author: 'orange',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 8,
  //         author: 'orange',
  //         message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 9,
  //         author: 'apple',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },
  //       {
  //         id: 10,
  //         author: 'orange',
  //         message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
  //         timestamp: new Date().getTime()
  //       },
  //     ]
  // }