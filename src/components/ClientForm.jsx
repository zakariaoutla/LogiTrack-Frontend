import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function ClientForm(){
    return(
        <>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                    <Box
                        component="form"

                        sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 3 }}
                    >
                        <Typography>
                            Nom et Prenom
                        </Typography>
                        <TextField
                            placeholder="Nom"
                            name="nom"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <Typography>
                            Email
                        </Typography>

                        <TextField
                            placeholder="Email"
                            name="email"
                            type="email"
                            variant="outlined"

                            fullWidth
                            required
                        />
                        <Typography>
                            Phone
                        </Typography>

                        <TextField
                            placeholder="Phone"
                            name="phone"
                            type="tel"
                            variant="outlined"

                            fullWidth
                            required
                        />
                        <Typography>
                            City
                        </Typography>

                        <TextField
                            placeholder="City"
                            name="city"
                            variant="outlined"

                            fullWidth
                            required
                        />

                        <Box sx={{display:'flex', gap:'10px'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ padding: 1.5, fontWeight: 'bold' }}
                            >
                                Ajouter
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ padding: 1.5, fontWeight: 'bold' }}
                            >
                                Annule
                            </Button>

                        </Box>


                    </Box>
                </Paper>
            </Container>

        </>
    )
}