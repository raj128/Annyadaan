import React from 'react';
import userpic from '../images/img/user.png'
import '../Styles/Notifications.css'

const Notifications = () => {
    return (
        <div>
            <h2>Your Notifications :</h2>
            <div className='notification-container'>
                
                <div className='noti-img'>
                    <img src={userpic}></img>
                </div>
                <div className='body'>
                    <p>XYZ liked your comment...!</p> 
                </div>
            </div>
        </div>
        
    );
};

export default Notifications;
