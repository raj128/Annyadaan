import "../Styles/BookButton.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookButton = ({ post }) => {
  const [booked, setbooked] = useState(post.bookers.length);
  const [isbooked, setIsbooked] = useState(false);
  const webApiUrl = "http://localhost:8800/posts/book";
  const dataStr = JSON.parse(window.localStorage.getItem("data"));
  const userId = dataStr.user._id;
  const data = {
    postId: post._id,
    _id: userId,
  };

  useEffect(() => {
    // check if the user has already booked the post
    setIsbooked(post.bookers.includes(userId));
  }, [post, userId]);

  const onBookButtonClick = async () => {
    try {
      if (!isbooked && post.meal_size > booked) {
        // if the user has not already booked the post and meal_size is greater than the number of bookers, send a request to the book API
        const response = await axios.post(webApiUrl, data, {
          headers: { Authorization: `Bearer ${dataStr.token}` },
        });
        console.log("successfully booked the post");
        setbooked(booked + 1); // update the booked state with the number of bookers returned from the server
        setIsbooked(true); // toggle the isbooked state
        toast.success("Booked Successfully.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (post.meal_size - booked === 0) {
        // Display a toast if remaining meals are zero
        toast.error("This meal is out of stock.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="booking-button"
      style={{
        backgroundColor: "red",
        color: "white",
        borderRadius: "0px 0px 10px 10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10%",
        cursor:"pointer"
      }}
      onClick={onBookButtonClick}
    >
      <Button >
        <div className="book-button">
          <h1>Book Now</h1>
          <h4>
            {`Remaining meals: ${post.meal_size - booked}`}/{post.meal_size}
          </h4>
        </div>
      </Button>
    </div>
  );
};

export default BookButton;
