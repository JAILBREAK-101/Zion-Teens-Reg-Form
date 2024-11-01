import React, { useState } from 'react';
import Logo from "../assets/images/logo.png"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Image } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import ReusableButton from './ui/Button';
// ...
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClick = () => {

  }

  const menuItems = [
    'Services',
    'Join a Department',
    'Events',
    'Sermons',
    'Sunday School',
    'Give',
  ];

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));  

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          {/* Navbar Brand */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={Logo} width={50} height={50} alt='logo' />
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <MenuItem key={item}>
                <Typography textAlign="center" sx={{ color: 'white' }}>
                  {item}
                </Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            
            <ReusableButton text="Join us" onClick={handleClick}/>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box
            sx={{
              width: 250,
              textAlign: 'center',
              backgroundColor: '#3f51b5',
              height: '100%',
              color: '#fff',
            }}
          >
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item} onClick={handleDrawerToggle}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
}

export default Navbar;