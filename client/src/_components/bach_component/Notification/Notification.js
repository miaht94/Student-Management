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
      if (message.includes('Lỗi') || message.includes('Thất bại') || message.includes('Error') || message.includes('Err'))
        notification.error({
          message: message,
          description: description,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      else if (message.includes('Thành công') || message.toLowerCase().includes('thanh cong') || message.includes('Success') || description.includes('Thành công') || description.includes('Success') ){
        notification.success({
          message: message,
          description: description,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
      else if (message.includes('Cảnh báo') || message.toLowerCase().includes('canh bao') || message.includes('Warning') || description.toLowerCase().includes('warning') || description.toLowerCase().includes('canh bao') ){
        notification.success({
          message: message,
          description: description,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
      else {
        notification.open({
          message: message,
          description: description,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
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