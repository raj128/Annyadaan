import React from 'react'
import Notification from './Notifications';

const NotificationsContainer = () => {

    const [Notifications, SetNotifications] = useState([]);
  
    let webApiUrl = 'http://localhost:8800/posts/allpost';
    var dataStr = JSON.parse(window.localStorage.getItem('data'));
  
    useEffect(() => {
      async function fetchNotifications() {
        try {
          const response = await axios.get(webApiUrl, { headers: { Authorization: `Bearer ${dataStr.token}` } });
          SetNotifications(response.data.list);
        } catch (error) {
          console.error(error);
        }
      }
      fetchNotifications();
    }, []);
  


  return (
    <div>
        {Notifications.map(notification => (
            <Notification key={notification._id} notification={notification}/>
        ))}
    </div>
  )
}

export default NotificationsContainer