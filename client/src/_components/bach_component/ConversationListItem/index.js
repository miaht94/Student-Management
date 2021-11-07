import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import './ConversationListItem.css';
import shave from 'shave';
export default function ConversationListItem(props) {
  useEffect(() => {
	  console.log("rerender item")
	shave(".conversation-snippet", 20)
  }, [])
    const {name, text } = props.data;
    return (
      <div className={"conversation-list-item" + (props.picked ? " picked" : "")}>
         <Avatar {...stringAvatar(name)}  className="conversation-photo" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <span className="conversation-snippet">{ truncateString(text,20) }</span>
        </div>
      </div>
    );
}

function stringToColor(string) {
	let hash = 0;
	let i;
  
	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
	  hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
  
	let color = '#';
  
	for (i = 0; i < 3; i += 1) {
	  const value = (hash >> (i * 8)) & 0xff;
	  color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */
  
	return color;
  }
function stringAvatar(name) {
	let a = name.split(' ')[0]
	return {
	  sx: {
		bgcolor: stringToColor(name),
	  },
	  children: `${a}`,
	};
  }
  function truncateString(str, num) {
	if (str.length > num) {
	  return str.slice(0, num) + "...";
	} else {
	  return str;
	}
  }