import React,{useEffect, useState} from 'react'
// import '../Styles/Post.css'
import userpic from '../images/img/user.png'
import userpic1 from '../images/img/user1.jpg'
import userpic2 from '../images/img/user2.jpg'
import userpic3 from '../images/img/user3.jpg'
import postpic1 from '../images/img/Food1.jpg'
import postpic2 from '../images/img/Food2.jpg'
import LikeButton from './LikeButton' 
import axios from 'axios';
import Post from './Post';
import { Paper } from '@mui/material'
import CommentContainer from './CommentsContainer.js'

const PostContainer = () => {
    const [posts, setPosts] = useState([]);
  
    let webApiUrl = 'http://localhost:8800/posts/allpost';
    var dataStr = JSON.parse(window.localStorage.getItem('data'));
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await axios.get(webApiUrl, { headers: { Authorization: `Bearer ${dataStr.token}` } });
          setPosts(response.data.list);
        } catch (error) {
          console.error(error);
        }
      }
      fetchPosts();
      
    }, []);
    


  return (
    <div>
        {posts.map(post => (
            <Post key={post._id} post={post} />
        ))}
       
    </div>
  )
}

export default PostContainer