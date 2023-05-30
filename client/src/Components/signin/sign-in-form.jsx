import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import axios from "axios";
import {ToastContainer , toast} from "react-toastify";
import {Navigate, useNavigate} from "react-router-dom";
const theme = createTheme();

export default function SignIn() {
  const navigate=useNavigate();
  const BACKEND_URL ="http://localhost:8800/auth/signin";

  const [data, setData ]=useState({
    email:"",
    password:"",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value});
  };

  const handleSubmit = async(event) => {
   try{
    event.preventDefault();
    const res=await axios.post(BACKEND_URL,data);
    //console.log(res.data);
    // var dataToStore = JSON.stringify(res.data);
    // localStorage.setItem('someData', dataToStore);
    localStorage['data'] = JSON.stringify(res.data);
    
    //console.log(dataStr)
    toast.success(res.data.message);
    setTimeout(()=>{
      navigate('/home');
    },2000)
 
   }catch(error){
    toast.error(error.message.data.message);
   }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
          
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}