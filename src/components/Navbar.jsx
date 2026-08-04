import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import logo from '../assets/LogitrackLogo.png';

const navLinkStyle = ({ isActive }) => ({
    color: '#fff',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
    borderRadius: 0,
});

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#1E3A5F' }}>
                <Toolbar>
                    <Box
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
                    >
                        <img src={logo} alt="LogiTrack" style={{ height: 60 }} />
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 4 }}>
                        <Button component={NavLink} to="/" style={navLinkStyle}>
                            Home
                        </Button>
                        <Button component={NavLink} to="/about" style={navLinkStyle}>
                            About
                        </Button>
                        <Button component={NavLink} to="/produit" style={navLinkStyle}>
                            Produit
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            component={NavLink}
                            to="/login"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: '#fff', color: '#fff' }}
                        >
                            Log In
                        </Button>
                        <Button
                            component={NavLink}
                            to="/register"
                            variant="contained"
                            sx={{ backgroundColor: '#fff', color: '#1976d2', '&:hover': { backgroundColor: '#e0e0e0' } }}
                        >
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;