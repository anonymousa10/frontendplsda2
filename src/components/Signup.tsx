import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

const Signup = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
 });

 const [error, setError] = useState('');

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
 };

 const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, navigate to login page
        navigate('/login');
      } else {
        // Handle errors
        setError(data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

 return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Signup
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
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Box>
    </Container>
 );
};

export default Signup;
