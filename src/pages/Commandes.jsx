import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TableSortLabel,
    Toolbar
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {getAllCommandes, updateStatut} from "../api/commandeService.js";
import CommandeRow from "../components/CommandeRow.jsx";

export default function Commandes() {
    const [commandes, setCommandes] = useState([]);
    const [totalElements, setTotalElements] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('')

    const fetchCommandes = async () => {
        try {
            const res = await getAllCommandes(page, size, orderBy, order);
            setCommandes(res.data.content || []);
            setTotalElements(res.data.totalElements)
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors du chargement des commandes.");
        }
    };
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
        setPage(0)
    }

    const handleUpdateStatus = async (id, newStatut) => {
        try {
            await updateStatut(id, newStatut,null);

            setCommandes(prevCommandes =>
                prevCommandes.map(cmd =>
                    cmd.id === id ? { ...cmd, commandeStatut: newStatut } : cmd
                )
            );
            toast.success("Statut modifié avec succès")

        } catch (error) {
            toast.error("Erreur lors de la modification :", error)
        }
    };

    useEffect(() => {
        fetchCommandes();
    }, [page, size, orderBy, order]);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Gestion des Commandes
                </Typography>
                <Button
                    component={NavLink}
                    to="/dashboard/commandes/nouvelle"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                    + Nouvelle Commande
                </Button>
            </Box>

            <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                <Toolbar sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', p: 2 }}>
                    <Typography variant="h6" sx={{ flex: '1 1 100%', fontWeight: 600, color: '#34495e' }}>
                        Liste des commandes récentes
                    </Typography>
                </Toolbar>

                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader hover={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "commande.id"}
                                        direction={orderBy === "commande.id" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("commande.id")}
                                    />
                                    ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "commande.client.nom"}
                                        direction={orderBy === "commande.client.nom" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("commande.client.nom")}
                                    />
                                    Client</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "dateCommande"}
                                        direction={orderBy === "dateCommande" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("dateCommande")}
                                    />
                                    Date de Commande</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "commandeStatut"}
                                        direction={orderBy === "commandeStatut" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("commandeStatut")}
                                    />
                                    Statut</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commandes.map((commande) => (
                                <CommandeRow
                                    key={commande.id}
                                    commande={commande}
                                    onUpdateStatus={handleUpdateStatus}
                                />
                            ))}

                            {commandes.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        Aucune commande trouvée.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={size}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setSize(parseInt(event.target.value, 10))
                        setPage(0)
                    }}
                    labelRowsPerPage="Rows per page:"
                />
            </Paper>
        </Box>
    );
}