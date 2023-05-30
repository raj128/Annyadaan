import React from 'react'
import '../Styles/Profile.css'
import logo from '../images/img/logo.jpg'
import userpic from '../images/img/user.png'
import Foodimg from '../images/img/Food.jpg'
// import PostContainer from './PostContainer'
import {Outlet,Link} from "react-router-dom"
import axios from 'axios'
import Notifications from '../Components/Notifications';
import UserContainer from './UserContainer.js'
import { useState } from 'react';
var dataStr = JSON.parse(window.localStorage.getItem('data'));
const Profile = () => {

    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
      if (showNotification===true){
          setShowNotification(false);
      }
      else{
        setShowNotification(true);
      }
    }

    const check = () =>{
      if (showNotification){
        <Notifications></Notifications>
      }
    }

  return (
    <div>
        <header>
            <aside className="left">
                <div className="logo">
                    <a href="#"><img src={logo}></img></a>
                </div>
                <ul>
                    <li><a href="#"><i class="fa-solid fa-house"></i><Link to="/">Home</Link></a></li>
                   
                    <li><a href="#"><i class="fa-solid fa-bell" onClick={handleClick}></i> Notification</a></li>
                    <li><a href="#"><i class="fa-solid fa-bookmark"></i> Your Bookings</a></li>
                    <li><a href="#"><i class="fa-solid fa-user" onClick={<UserContainer/>}></i>Profile</a></li>
                </ul>
                <Link to="/posts"><button>Post</button></Link>
            </aside>
            <section>
                <div className="main-img">
                    <h1>Hey Dude, Donate some Food..!</h1>
                </div>

                <UserContainer></UserContainer>
            </section>
            <aside class="right">
                <div class="auth-buttons">
                    <div class="signin-button">
                        <Link to="/signup"><button>Log Out</button></Link>
                    </div>
                </div>
                <div className="search_bar">
                    <i className = "fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search on Twitter'></input>
                </div>
                <div className="user">
                    <h3>Hey, {dataStr.user.name} !</h3>
                    <img src={userpic} alt=""></img>
                </div>
                {/* <div class="notifications"> */}
                    {/* <a href="#" ></a>{showNotification && <Notifications/>} */}
                {/* </div> */}
            </aside>
        </header>
    </div>
  )
}

export default Profile