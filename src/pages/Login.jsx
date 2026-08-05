import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import logo from '../assets/Logitracklogin.png'
import {postUserLogin} from "../api/userService.js";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await postUserLogin(email,password)
            const token = res.data.token;
            localStorage.setItem("token", token)
            const decodedToken = jwtDecode(token)
            toast.success("Vous êtes connecté avec succès !")
            navigate("/dashboard")
        }catch (err){
            toast.error("Erreur lors de la connexion. Veuillez réessayer.")
            console.error("Registration failed:",err)
        }
    };

    return (
        <Box
            sx={{
                minHeight: '120vh',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F8F9FA',

            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                    }}
                >
                    <Box>
                        <img src={logo} style={{height: 100}}/>
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1E3A5F' }}>
                        Welcome Back
                    </Typography >

                    <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1E3A5F', fontSize:"17px" }}>
                        Sign in to your account to continue
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                backgroundColor: '#1E3A5F',
                                '&:hover': { backgroundColor: '#16293F' },
                            }}
                        >
                            Se Connecter
                        </Button>

                        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                            Don't have an account?{' '}
                            <Typography
                                component="span"
                                sx={{ color: '#1E3A5F', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                            >
                                Sign up here
                            </Typography>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;