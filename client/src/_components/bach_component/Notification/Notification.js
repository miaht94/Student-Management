import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { alertBachAtom } from '_state/alert_bach';
  import { Button, notification, Divider, Space } from 'antd';
  import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
  } from '@ant-design/icons';
  
  const Context = React.createContext({ name: 'Default' });
  
  function Notification() {
    const [notification_, setNoti] = useRecoilState(alertBachAtom);
    const openNotification = (message, description) => {
      notification.open({
        message: message,
        description: description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };
    useEffect(() => {
      if (notification_.message || notification_.description)
        openNotification(notification_.message, notification_.description);
    },[notification_])
    return (
      <></>
    );
  };
  export {Notification};