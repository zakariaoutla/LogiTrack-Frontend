import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import {getProduit} from "../api/produitService.js";


export default function ProductDetails() {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduit(id);
                setProduit(res.data);
            } catch (err) {
                console.error("Erreur API :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!produit) {
        return (
            <Typography sx={{ mt: 5, textAlign: 'center' }} variant="h6" color="error">
                Produit introuvable
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 2 }}>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Détails du Produit
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">
                    <strong>ID :</strong> #{produit.id}
                </Typography>

                <Typography variant="h6">
                    <strong>Nom :</strong> {produit.nom}
                </Typography>

                <Typography variant="h6">
                    <strong>Catégorie :</strong> {produit.categorie}
                </Typography>

                <Typography variant="h6">
                    <strong>Prix :</strong> {produit.prix} MAD
                </Typography>

                <Typography variant="h6">
                    <strong>Quantité :</strong> {produit.quantiteStock}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
                <Button
                    variant="outlined"
                    component={NavLink}
                    to="/dashboard/produits"
                >
                    Retour
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    component={NavLink}
                    to={`/dashboard/produits/update-produit/${produit.id}`}
                >
                    Modifier
                </Button>
            </Box>

        </Box>
    );
}