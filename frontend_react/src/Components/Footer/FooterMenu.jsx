import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FooterMenu = ({ title, buttons }) => {
  return (
    <Box sx={{ marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography sx={{
          color: '#666666',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          marginLeft: '8px',
          fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px' },  // Corrected here
          letterSpacing: 'large',
      }}>
        {title}
      </Typography>
      
      {buttons.map((button, index) => (
        <Button key={index} sx={{
            color: '#d3d3d3',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            letterSpacing: 'large',
            fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },  // Corrected here
            lineHeight: '1.1',
        }}>
          {button}
        </Button>
      ))}
    </Box>
  );
}

export default FooterMenu;