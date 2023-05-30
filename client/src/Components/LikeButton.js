
import '../Styles/LikeButton.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLike, setIsLike] = useState(false);

    const webApiUrl = 'http://localhost:8800/posts/like';
    const unlikewebApiUrl='http://localhost:8800/posts/unlike';
    const dataStr = JSON.parse(window.localStorage.getItem('data'));
    const userId = dataStr.user._id;
    const data = {
        "postId": post._id,
        "_id": userId
    }

    useEffect(() => {
        // check if the user has already liked the post
        setIsLike(post.likes.includes(userId));
    }, [post, userId]);

    
    const onLikeButtonClick = async () => {
        try {
            console.log(data)
            let response;
            if (isLike) {
                // if the user has already liked the post, send a request to the unlike API
                response = await axios.post(unlikewebApiUrl, data, { headers: { Authorization: `Bearer ${dataStr.token}` } });
            } else {
                // if the user has not liked the post yet, send a request to the like API
                response = await axios.post(webApiUrl, data, { headers: { Authorization: `Bearer ${dataStr.token}` } });
            }
            console.log("successfully updated like status");
            setLike(response.data.likes); // update the like state with the number of likes returned from the server
            setIsLike(!isLike); // toggle the isLike state

        } catch (error) {
            console.log("nopp")
            console.error(error);
        }
    }


    return (
        <div className='like-container'>
            <p className={"" + (isLike ? "Liked" : "Unliked")}>
                <i className={"fa-solid fa-heart"} onClick={onLikeButtonClick}></i>
            </p>
            <h4>{like}</h4>
        </div>
    )
}

export default LikeButton;
