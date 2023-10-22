import React from "react";
import Home from "./Components/Home";
import "./App.css";
import SignIn from "./Components/signin/sign-in-form";
import SignUp from "./Components/signup/sign-up-form.component";
import CreatePost from "./Components/createpost.js";
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Profile from './Components/profile';
import BookingPage from "./Components/BookingPage";

// import ProfilePage from "./Components/profile";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
      <Route path="/" element={<SignUp/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/posts" element={<CreatePost/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/bookings" element={<BookingPage/>}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </LocalizationProvider>
    
      
    
  );
}

export default App;
