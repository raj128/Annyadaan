import '../Styles/LikeButton.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/LikeButton.css';

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
        // <div className='like-container'>
        //     <p className={isLike ? "Liked" : "Unliked"}>
        //         <i className="fa-solid fa-heart" onClick={onLikeButtonClick}></i>
        //     </p>
        //     <h4>{likes}</h4>
        // </div>

        <div id="main-content">
  <div>
    <input type="checkbox" id="checkbox" onClick={onLikeButtonClick}/>
    <label for="checkbox">
      <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>

          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>
    </label>
  </div>
  <h3>{likes}</h3>
</div>
    )
}

export default LikeButton;
