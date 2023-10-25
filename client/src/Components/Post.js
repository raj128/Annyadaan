import React from "react";
import "../Styles/Post.css";
import userpic from "../images/img/user.png";
import userpic1 from "../images/img/user1.jpg";
import userpic2 from "../images/img/user2.jpg";
import userpic3 from "../images/img/user3.jpg";
import postpic1 from "../images/img/Food1.jpg";
import postpic2 from "../images/img/Food2.jpg";
import LikeButton from "./LikeButton";
import BookButton from "./BookButton";
import Comments from "./Comments";
var dataStr = JSON.parse(window.localStorage.getItem("data"));
const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="profilepic">
        <img src={userpic} alt="User" />
        <h3>{post.postedBy.name}</h3>
      </div>
      <div className="post-details">
        <div
          className="post-image"
          style={{
            backgroundImage: `url(${post.img_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="post-image-content">
            <h3>{post.title}</h3>
            <div
              className={
                "" + post.food_tags == "veg"
                  ? "food-type-veg"
                  : "food-type-non-veg"
              }
            >
              {post.food_tags}
            </div>
          </div>
          {/* <img src={post.img_url} alt="Post" /> */}
        </div>

        <h3>Venue : {post.venue}</h3>
        <h3>City : {post.city}</h3>
        <h3>Best Before : {post.expirey_date.slice(0, 10)}</h3>

        <div className="post-buttons">
          <LikeButton post={post} />

          {/* <div className="Book-button"><button>Book</button></div> */}

        </div>
        {/* <Comments post={post} /> */}
      </div>
          <BookButton post={post} />
    </div>
  );
};

export default Post;
