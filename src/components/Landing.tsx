// src/components/Landing.tsx

// import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.3)', // Increased shadow size and darkness
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Welcome to Your Forum
        </h1>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FontAwesomeIcon icon={faUserPlus} />}
              onClick={handleSignupClick}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ marginTop: '1.5rem' }}>
          Please Login or Signup if you don't have an account to start your journey in the forum!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Landing;
