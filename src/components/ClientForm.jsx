import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {NavLink, useParams} from "react-router-dom";

export default function ClientForm({handleSubmit, handleChange, formData}){
    const {id}=useParams()
    return(
        <>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}

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
                            value={formData.nom ||""}
                            onChange={handleChange}
                        />
                        <Typography>
                            Email
                        </Typography>

                        <TextField
                            placeholder="Email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
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
                            name="telephone"
                            value={formData.telephone || ""}
                            onChange={handleChange}
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
                            name="ville"
                            value={formData.ville || ""}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <Box sx={{display:'flex',justifyContent:'end'}}>
                            <Box sx={{display:'flex', gap:'10px'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ padding: 1.5, fontWeight: 'bold' }}
                                >
                                    {id? 'Modifier': 'Ajouter'}

                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ padding: 1.5, fontWeight: 'bold' }}
                                    component={NavLink}
                                    to="/dashboard/clients"
                                >
                                    Annule
                                </Button>

                            </Box>
                        </Box>



                    </Box>
                </Paper>
            </Container>

        </>
    )
}