import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AuthContext} from "./AuthContext.jsx";

const Topbar = () => {
   const {user} = useContext(AuthContext)
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                px: 3,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    border: '1px solid #BFC7D2',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.5,
                    width: { xs: '200px', md: '300px' },
                    transition: 'box-shadow 0.2s',
                    '&:focus-within': {
                        boxShadow: '0 0 0 2px #1E3A5F33',
                        borderColor: '#1E3A5F',
                    }
                }}
            >
                <SearchIcon sx={{ color: '#9CA3AF', mr: 1, fontSize: 20 }} />
                <InputBase
                    placeholder="Search..."
                    sx={{ flex: 1, fontSize: '14px', color: '#374151' }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                <Box sx={{ width: '1px', height: '24px', backgroundColor: '#BFC7D2' }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer'
                    }}
                >
                    <AccountCircleIcon sx={{ fontSize: 36, color: '#1E3A5F' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: '#1F2937', lineHeight: 1 }}
                        >
                            {user.nom}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: '#6B7280', mt: 0.5 }}
                        >
                            {user.role}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default Topbar;