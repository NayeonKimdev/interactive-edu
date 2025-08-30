import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Interactive Educational Platform
        </Typography>
        <Box>
          <Button color="inherit">Learning Cards</Button>
          <Button color="inherit">Categories</Button>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
