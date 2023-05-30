import '../Styles/LikeButton.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookButton = ({ post }) => {
    const [booked, setbooked] = useState(post.bookers.length);
    const [isbooked, setIsbooked] = useState(false);
    const webApiUrl = 'http://localhost:8800/posts/book';
    const dataStr = JSON.parse(window.localStorage.getItem('data'));
    const userId = dataStr.user._id;
    const data = {
        "postId": post._id,
        "_id": userId
    };

    useEffect(() => {
        // check if the user has already booked the post
        setIsbooked(post.bookers.includes(userId));
    }, [post, userId]);

    const onBookButtonClick = async () => {
        try {
            if (!isbooked && post.meal_size > booked) {
                // if the user has not already booked the post and meal_size is greater than the number of bookers, send a request to the book API
                const response = await axios.post(webApiUrl, data, { headers: { Authorization: `Bearer ${dataStr.token}` } });
                console.log("successfully booked the post");
                setbooked(booked + 1); // update the booked state with the number of bookers returned from the server
                setIsbooked(true); // toggle the isbooked state
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='like-container'>
            <p className={isbooked ? "booked" : ""}>
                <i className="fa-solid fa-bookmark" onClick={onBookButtonClick}></i>
            </p>
            <h4>{`Remaining meals: ${post.meal_size - booked}`}</h4>
        </div>
    )
}

export default BookButton;
