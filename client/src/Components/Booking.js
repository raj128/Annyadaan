import React from 'react';
import userpic from '../images/img/user.png'
import '../Styles/Bookings.css'

const Post = () => {
    return (
        <div>
            <h2>Your Bookings :</h2>
            <div className='booking-container'>
                
                <div className='noti-img'>
                    <img src={userpic}></img>
                </div>
                <div className='body'>
                    <p>XYZ booked your post...!</p> 
                </div>
            </div>
        </div>
        
    );
};

export default Post;
