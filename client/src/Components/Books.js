import React from "react";
import userpic from "../images/img/user.png";
import "../Styles/Books.css";
import { Button } from "@mui/material";

const Books = ({post}) => {
  return (
    <div>
      <div className="books-container">
      <div className="books-title">
        <h1>Title : {post?.title}</h1>
      </div>
        <div>
            <h3> Venue : {post?.venue}</h3>
            <h3> Expiry Date : {post?.expirey_date.slice(0,10)}</h3>
            <h3> Date : {post?.time}</h3>
        </div>
        <Button>Cancel Booking</Button>
      </div>
    </div>
  );
};

export default Books;
