import React, { useState } from 'react';
import axios from 'axios';

const Comments = ({ post }) => {
  const [comment, setComment] = useState('');
  let webApiUrl = 'http://localhost:8800/posts/comment';
  let dataStr = JSON.parse(window.localStorage.getItem('data'));
  let token = dataStr.token;
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  async function handleCommentSubmit(event) {
    event.preventDefault();
    // Submit the comment to the server here
    const newComment = {
      text: comment,
      _id: dataStr.user._id,
      postId: post._id,
    };
    try {
      const response = await axios.post(webApiUrl, newComment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.status === 200) {
        window.location.href = '/home';
      } else {
        // display error message to user
      }
    } catch (error) {
      console.error(error);
    }
    setComment('');
  }
  

  return (
    <div className="comment-container">
      <h3>Comments</h3>
      <br></br>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-text">
              
              <h4>{comment.postedBy.name}</h4>
              <p>{comment.Text}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <br></br>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Comments;
