import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { NavLink, useParams } from "react-router-dom";

export default function ProductForm({ handleSubmit, handleChange, formData }) {
    const { id } = useParams();

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                    {id ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                >
                    <TextField
                        label="Nom du produit"
                        placeholder="Ex: Ordinateur Portable"
                        name="nom"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.nom || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Catégorie"
                        placeholder="Ex: Électronique"
                        name="categorie"
                        value={formData.categorie || ""}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                            label="Prix"
                            placeholder="0.00"
                            name="prix"
                            value={formData.prix || ""}
                            onChange={handleChange}
                            type="number"
                            inputProps={{ min: 0, step: "0.01" }}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            label="Quantité en stock"
                            placeholder="0"
                            name="quantiteStock"
                            value={formData.quantiteStock || ""}
                            onChange={handleChange}
                            type="number"
                            inputProps={{ min: 0 }}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            sx={{ fontWeight: 'bold' }}
                            component={NavLink}
                            to="/dashboard/produits"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {id ? 'Modifier le produit' : 'Ajouter le produit'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}