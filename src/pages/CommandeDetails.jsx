import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
    Box, Typography, Button, Paper, Container, Grid,
    MenuItem, Select, InputLabel, FormControl, TextField, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";

import { getCommandeById } from "../api/commandeService.js";
import { getAllProduit } from "../api/produitService.js";
import {ajouteUnProduit, getAllOrders} from "../api/ligneCommande.js";

export default function CommandeDetails() {
    const { id } = useParams();

    const [commande, setCommande] = useState(null);
    const [lignes, setLignes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [produits, setProduits] = useState([]);
    const [selectedProduitId, setSelectedProduitId] = useState("");
    const [quantite, setQuantite] = useState(1);
    const [adding, setAdding] = useState(false);

    const fetchData = async () => {
        try {
            const resCommande = await getCommandeById(id);
            setCommande(resCommande.data);
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors du chargement des données.");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProduit = async ()=>{
        try{
            const resProduits = await getAllProduit(0, 10, "nom", "asc");
            setProduits(resProduits.data.content);
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors du chargement des données.");
        } finally {
            setLoading(false);
        }
    }

    const fetchAllOrder = async ()=>{
        try{
            const resLignes = await getAllOrders(id, 0, 5,"","");
            setLignes(resLignes.data.content);
            console.log(resLignes.data.content)
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors du chargement des données.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        fetchAllProduit()
        fetchAllOrder()
    }, [id]);

    const handleAddLigne = async (e) => {
        e.preventDefault();

        if (!selectedProduitId || quantite <= 0) {
            toast.warning("Veuillez choisir un produit et une quantité valide.");
            return;
        }

        setAdding(true);
        try {
            const request = {
                produitId: selectedProduitId,
                quantite: parseInt(quantite, 10)
            };

            await ajouteUnProduit(id, request);

            toast.success("Produit ajouté à la commande !");

            setSelectedProduitId("");
            setQuantite(1);
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Erreur lors de l'ajout (Vérifiez le stock ou vos droits d'accès).");
        } finally {
            setAdding(false);
        }
    };
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!commande) return <Typography>Commande introuvable.</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBackIcon />} component={NavLink} to="/dashboard/orders" sx={{ mb: 2 }}>
                Retour aux commandes
            </Button>

            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Commande #{commande.id}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Client : {commande.clientNom}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date : {commande.dateCommande}
                        </Typography>
                    </Box>
                    <Chip
                        label={commande.commandeStatut}
                        color={commande.commandeStatut === 'LIVREE' ? 'success' : 'primary'}
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>
            </Paper>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Ajouter un Produit</Typography>
                        <Box component="form" onSubmit={handleAddLigne} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                            <FormControl fullWidth required>
                                <InputLabel>Produit</InputLabel>
                                <Select
                                    value={selectedProduitId}
                                    label="Produit"
                                    onChange={(e) => setSelectedProduitId(e.target.value)}
                                >
                                    {produits.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>
                                            {p.nom} (Stock: {p.quantiteStock})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Quantité"
                                type="number"
                                required
                                value={quantite}
                                onChange={(e) => setQuantite(e.target.value)}
                                inputProps={{ min: 1 }}
                                fullWidth
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={adding}
                            >
                                {adding ? <CircularProgress size={24} /> : "Ajouter à la commande"}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Produits dans la commande</Typography>

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Produit</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Prix Unitaire</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Quantité</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Sous-total</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lignes.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                                Aucun produit n'a encore été ajouté.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        lignes.map((ligne) => {
                                            const sousTotal = (ligne.montantTotal || 0) * ligne.quantite;

                                            return (
                                                <TableRow key={ligne.id}>
                                                    <TableCell>{ligne.produitNom}</TableCell>
                                                    <TableCell>{ligne.montantTotal} MAD</TableCell>
                                                    <TableCell>{ligne.quantite}</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                                        {sousTotal.toFixed(2)} MAD
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleDeleteLigne(ligne.id)}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}