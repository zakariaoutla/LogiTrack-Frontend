import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import logo from '../assets/Logitracklogin.png'
import {postUserRegister} from "../api/userService.js";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[role, setRole] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await postUserRegister(firstName, lastName,email, password, role)
            toast.success("Compte créé avec succès !");
            navigate("/login")
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }catch (err){
            toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
            console.error("Registration failed:", err);
        }


    };

    return (
        <Box
            sx={{
                minHeight: '150vh',
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
                        Create Account
                    </Typography >

                    <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1E3A5F', fontSize:"17px" }}>
                        Sign up to get started
                    </Typography>

                    <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="first name"
                            name="first name"
                            type="text"
                            autoComplete="name"
                            autoFocus
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last name"
                            name="Last name"
                            type="text"
                            autoComplete="name"
                            autoFocus
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email"
                            name="email"
                            type="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Rôle</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role}
                                label="Rôle"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="MANAGER">Manager</MenuItem>
                                <MenuItem value="AGENT">Agent</MenuItem>
                            </Select>
                        </FormControl>


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
                            S'inscrire
                        </Button>

                        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                            Already have an account?{' '}
                            <Typography
                                component="span"
                                sx={{ color: '#1E3A5F', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                            >
                                Log in here
                            </Typography>
                        </Typography>

                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;