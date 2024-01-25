// src/components/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import Cookies from 'js-cookie';


const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const navigate = useNavigate();

 const handleLogin = async () => {
    try {
       const response = await fetch('http://localhost:8080/api/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           username: username,
           password: password,
         }),
       });
   
       if (response.ok) {
         // Clear previous error, if any
         setError('');
   
         // Get the JWT token from the response
         const data = await response.json();
         const token = data.token;
   
         // Store the JWT token in cookies
        // Cookies.set('jwt_token', token, { expires: 7, secure: false });

   
         // Store the JWT token in local storage
         localStorage.setItem('jwtToken', token);
   
         // Redirect to the home page upon successful login
         navigate('/home');
       } else {
         // Display error message for unsuccessful login
         setError('Username and Password do not match');
       }
    } catch (error) {
       console.error('Error during login:', error);
       setError('An unexpected error occurred');
    }
   };
   

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}

        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
 );
};

export default Login;