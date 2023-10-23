import '../Styles/LikeButton.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [likes,setLikes] = useState(like);
    const [isLike, setIsLike] = useState(false);

    const webApiUrl = 'http://localhost:8800/posts/like';
    const unlikewebApiUrl = 'http://localhost:8800/posts/unlike';
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
            let response;
            if (isLike) {
                response = await axios.post(unlikewebApiUrl, data, { headers: { Authorization: `Bearer ${dataStr.token}` } });
                setLikes(likes-1);
            } else {
                response = await axios.post(webApiUrl, data, { headers: { Authorization: `Bearer ${dataStr.token}` } });
                setLikes(likes+1);
            }
            console.log("successfully updated like status");

            // Update the like state with the new number of likes from the server response
            setLike(response.data.likes);
            
            // Toggle the isLike state
            setIsLike(!isLike);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='like-container'>
            <p className={isLike ? "Liked" : "Unliked"}>
                <i className="fa-solid fa-heart" onClick={onLikeButtonClick}></i>
            </p>
            <h4>{likes}</h4>
        </div>
    )
}

export default LikeButton;
