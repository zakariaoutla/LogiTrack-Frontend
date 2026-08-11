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
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDelete from "../components/ConfirmDelete.jsx";
import ProductList from "../components/ProductList.jsx";
import {deleteProduit, getAllProduit} from "../api/produitService.js";


export default function Produits() {
    const [produits, setProduits] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nom');

    const fetchProduit = async () => {
        try {
            const res = await getAllProduit(page, size, orderBy, order);
            setProduits(res.data.content || []);
            setTotalElements(res.data.totalElements || 0);
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors du chargement des produits.");
        }
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduit(id);
            toast.success("Le produit a été supprimé avec succès.");
            fetchProduit();
        } catch (err) {
            console.error(err);
            toast.error("Impossible de supprimer ce produit. Veuillez réessayer.");
        }
    };

    const executeDelete = (id, name) => {
        toast.warning(
            ({ closeToast }) => (
                <ConfirmDelete
                    name={name}
                    closeToast={closeToast}
                    onConfirm={() => handleDelete(id)}
                />
            ),
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center"
            }
        );
    };

    useEffect(() => {
        fetchProduit();
    }, [page, size, orderBy, order]);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Gestion des Produits
                </Typography>
                <Button
                    component={NavLink}
                    to="/dashboard/produits/ajoute-produit"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                    + Ajouter un produit
                </Button>
            </Box>

            <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                <Toolbar sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', p: 2 }}>
                    <Typography variant="h6" sx={{ flex: '1 1 100%', fontWeight: 600, color: '#34495e' }}>
                        Liste des produits enregistrés
                    </Typography>
                </Toolbar>

                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader hover>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "id"}
                                        direction={orderBy === "id" ? order : "asc"}
                                        onClick={() => handleSort("id")}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "nom"}
                                        direction={orderBy === "nom" ? order : "asc"}
                                        onClick={() => handleSort("nom")}
                                    >
                                        Nom du produit
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "categorie"}
                                        direction={orderBy === "categorie" ? order : "asc"}
                                        onClick={() => handleSort("categorie")}
                                    >
                                        Catégorie
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "prix"}
                                        direction={orderBy === "prix" ? order : "asc"}
                                        onClick={() => handleSort("prix")}
                                    >
                                        Prix (MAD)
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    <TableSortLabel
                                        active={orderBy === "quantiteStock"}
                                        direction={orderBy === "quantiteStock" ? order : "asc"}
                                        onClick={() => handleSort("quantiteStock")}
                                    >
                                        Quantite
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {produits?.map((p) => (
                                <ProductList
                                    product={p}
                                    key={p.id}
                                    handleDelete={() => executeDelete(p.id, p.nom)}
                                />
                            ))}
                            {produits.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        Aucun produit trouvé.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={size}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setSize(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Lignes par page :"
                />
            </Paper>
        </Box>
    );
}