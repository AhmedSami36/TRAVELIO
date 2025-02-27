import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Popover,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../Config/config';

const UserIcon = ({ profilePic, username, firstName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const visitProfile = () => {
    navigate(`/profile`);
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.setItem('loggedin', 'false');
      navigate(`/`);
      window.location.reload();
    } catch (error) {
      console.error("Error while signing out:", error);
    }
  };  
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Avatar alt={username} src={profilePic} onClick={handleClick} 
        sx={{
          width: { xs: '70px', sm: '40px', md: '40px', lg: '40px' },
          height: { xs: '70px', sm: '40px', md: '40px', lg: '40px' },
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
       sx = {{
        marginTop: '10px',
        Padding: '10px',
       }}
      >
        <Box p={2}>
            <Typography variant="h6" align="center" sx={{fontFamily: 'Poppins', fontWeight: '600'}}>{username}</Typography>
            <Avatar alt={username} src={profilePic} sx={{ width: 100, height: 100, margin: 'auto', marginTop: 2 }} />
            <Typography variant="body1" align="center" sx={{marginTop: '10px', fontFamily: 'Poppins'}}>Hi, {firstName}!</Typography>
            <Button variant="contained" color="primary" onClick={visitProfile} sx={{fontFamily: 'Poppins', fontWeight: '600', width: '100%', marginTop: 1, borderRadius: 5}}>Visit Profile</Button>
            <Button variant="outlined" color="primary" onClick={signOut} sx={{fontFamily: 'Poppins', fontWeight: '600', width: '100%', marginTop: 1, borderRadius: 5}}>Sign Out</Button>
        </Box>
      </Popover>
    </div>
  );
};

export default UserIcon;