import React, {useContext} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/LogitrackLogo.png';
import {AuthContext} from "./AuthContext.jsx";

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Clients', icon: <PeopleIcon />, path: 'clients' },
    { text: 'Products', icon: <Inventory2Icon />, path: '/products' },
    { text: 'Orders', icon: <LocalShippingIcon />, path: '/orders' },
    { text: 'Users', icon: <GroupIcon />, path: '/users' },
];

const Sidebar = () => {
    const {logout} = useContext(AuthContext)

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1E3A5F',
                    color: '#fff',
                    borderRight: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 2,
                }}
            >
                <img src={logo} alt="LogiTrack" style={{ height: 70 }} />
            </Box>

            <List sx={{ px: 1, mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            color: 'rgba(255, 255, 255, 0.75)',
                            '&.active': {
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                color: '#fff',
                                '& .MuiListItemIcon-root': {
                                    color: '#fff',
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ mt: 'auto', mb: 2, px: 1 }}>

                <ListItemButton
                    onClick={logout}
                    sx={{
                        borderRadius: 2,
                        color: '#ff6b6b',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: '#ff6b6b', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItemButton>
            </Box>

        </Drawer>
    );
};

export default Sidebar;