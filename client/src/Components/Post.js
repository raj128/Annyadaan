import React from 'react';
import '../Styles/Post.css';
import userpic from '../images/img/user.png';
import userpic1 from '../images/img/user1.jpg';
import userpic2 from '../images/img/user2.jpg';
import userpic3 from '../images/img/user3.jpg';
import postpic1 from '../images/img/Food1.jpg';
import postpic2 from '../images/img/Food2.jpg';
import LikeButton from './LikeButton';
import BookButton from './BookButton';
import Comments from './Comments';
var dataStr = JSON.parse(window.localStorage.getItem('data'));
const Post = ({ post }) => {
    return (
        <div className="post-container">
            <div className="profilepic">
                <img src={userpic} alt="User" />
                <h3>{post.title}</h3>
                
                {/* <h3>{post.postedBy.name}</h3> */}
                {/* <div className="post-details">
                    <div className="name">
                        
                    </div>      
                </div> */}
            </div>
            <div className="post-details">
            <img src={post.img_url} alt="Post" />
                    <h3>posted by:{post.postedBy.name}</h3>
                    <div className={"" + (post.food_tags)=="veg" ? "food-type-veg" : "food-type-non-veg"}>{post.food_tags}</div>
                    <h3>Venue :{post.venue}</h3>
                    <h3>City :{post.city}</h3>
                    <div className="post-img">
                      
                    </div>
                <div className="post-buttons">
                    <LikeButton post={post}/>
                    
                    <div className="stock-size">mealSize:{post.meal_size}</div>
                    <div className="stock-size">expirey_date:{post.expirey_date.slice(0,10)}</div>
                    {/* <div className="Book-button"><button>Book</button></div> */}
                    <BookButton post={post}/>
                    
                </div>
                <Comments post={post}/>
            </div>
        </div>
    );
};

export default Post;