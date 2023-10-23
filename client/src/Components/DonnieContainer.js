import { Button } from '@mui/material'
import React from 'react'
import "../Styles/Books.css";
import DonnieDropdown from './DonnieDropdown';

const DonnieContainer = ({post}) => {
  return (
    <div className="books-container">
      <div className="books-title">
        <h1>Title : {post?.title}</h1>
      </div>
        <div>
            <h3> Venue : {post?.venue}</h3>
            <h3> Expiry Date : {post?.expirey_date.slice(0,10)}</h3>
            <h3> Date : {post?.time}</h3>
        </div>
        <DonnieDropdown>Cancel Booking</DonnieDropdown>
      </div>
  )
}

export default DonnieContainer