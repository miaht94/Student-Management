import React from 'react';
import './Compose.css';
import { useState } from 'react';
export default function Compose(props) {
  const [inputValue, setInputValue] = useState("");
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }
  const onSendMessage = props.onSendMessage ? props.onSendMessage : () => {}  
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(props)
      onSendMessage(inputValue);
      setInputValue("");
    }
  }
    return (
      <div className={props.visible ? "compose" : "compose hidden"}>
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
        />

        {
          props.rightItems
        }
      </div>
    );
}