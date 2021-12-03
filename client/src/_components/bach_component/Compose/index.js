import React from 'react';
import './Compose.css';
import { useState } from 'react';
import {Button} from 'antd';
import {SendOutlined} from '@ant-design/icons'

export default function Compose(props) {
  const [inputValue, setInputValue] = useState("");
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }
  const onSendMessage = props.onSendMessage ? props.onSendMessage : () => {}  
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(props)
      if (inputValue.replace(/\s/g, '')!='') {
        onSendMessage(inputValue);
      }  
      setInputValue("");
    }
  }

  function onClick() {
    if (inputValue.replace(/\s/g, '')!='') {
      onSendMessage(inputValue);
    }
  }

    return (
      <div className={props.visible ? "compose" : "compose hidden"}>
        <input
          type="text"
          className="compose-input"
          placeholder="Nhập tin nhắn để gửi"
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
        />
        <Button type="primary" shape="circle" icon={<SendOutlined />} size="large" onClick = {onClick} />
        {
          props.rightItems
        }
      </div>
    );
}