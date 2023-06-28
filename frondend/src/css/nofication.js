import {notification} from 'antd';

export const [api, contextHolder] = notification.useNotification();
    
const openNotificationWithIcon = (type, message, description) => {
    api[type]({
    message: message,
    description:
        description,
    });
};

export default openNotificationWithIcon;