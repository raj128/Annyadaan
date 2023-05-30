import React from 'react';
const CommentContainer = ({ post }) => {
    return (
      <div>
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <p>By: {comment.author}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default CommentContainer;