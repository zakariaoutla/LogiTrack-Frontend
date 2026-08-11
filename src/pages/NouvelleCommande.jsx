import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Paper,
    Container,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Divider,
    TextField
} from "@mui/material";
import { toast } from "react-toastify";

import { creeCommande } from "../api/commandeService.js";
import { getAllClients } from "../api/clientService.js";

export default function NouvelleCommande() {
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];

    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState("");

    const [dateCommande, setDateCommande] = useState(today);
    const [statut, setStatut] = useState("EN_ATTENTE");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await getAllClients(0, 10, "", "asc");
                setClients(res.data.content || res.data || []);
            } catch (err) {
                console.error(err);
                toast.error("Erreur lors du chargement des clients.");
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedClientId) {
            toast.warning("Veuillez sélectionner un client.");
            return;
        }

        setSubmitting(true);
        try {
            const request = {
                clientId: selectedClientId,
                dateCommande: dateCommande,
                commandeStatut: statut
            };

            const res = await creeCommande(request);
            toast.success("Commande initiée avec succès !");
            navigate(`/dashboard/commandes/detail/${res.data.id}`);

        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la création de la commande.");
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                    Initier une nouvelle commande
                </Typography>
                <Divider sx={{ mb: 4 }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        <FormControl fullWidth required>
                            <InputLabel id="client-select-label">Sélectionner un Client</InputLabel>
                            <Select
                                labelId="client-select-label"
                                value={selectedClientId}
                                label="Sélectionner un Client"
                                onChange={(e) => setSelectedClientId(e.target.value)}
                            >
                                {clients.length === 0 && (
                                    <MenuItem disabled value="">
                                        Aucun client disponible
                                    </MenuItem>
                                )}
                                {clients.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>
                                        {client.nom} {client.prenom} - {client.telephone}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Date de Commande"
                            type="date"
                            fullWidth
                            required
                            value={dateCommande}
                            onChange={(e) => setDateCommande(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <FormControl fullWidth required>
                            <InputLabel id="statut-select-label">Statut de la commande</InputLabel>
                            <Select
                                labelId="statut-select-label"
                                value={statut}
                                label="Statut de la commande"
                                onChange={(e) => setStatut(e.target.value)}
                            >
                                <MenuItem value="EN_ATTENTE">En attente</MenuItem>
                                <MenuItem value="EXPEDIEE">Expédiée</MenuItem>
                                <MenuItem value="LIVREE">Livrée</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                component={NavLink}
                                to="/dashboard/orders"
                                disabled={submitting}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submitting || !selectedClientId}
                            >
                                {submitting ? <CircularProgress size={24} /> : "Créer et ajouter des produits"}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}