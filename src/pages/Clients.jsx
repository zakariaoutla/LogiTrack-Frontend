import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClientList from "../components/ClientList.jsx";
import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TableBody
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {useEffect, useState} from "react";
import {deleteClient, getAllClients, getClient} from "../api/clientService.js";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import ConfirmDelete from "../components/ConfirmDelete.jsx";

export default function Clients() {
    const [clients, setClients] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('nom')

    const getClients = async () => {
        try {
            const res = await getAllClients(page, size, orderBy, order)
            setClients(res.data.content)
            setTotalElements(res.data.totalElements)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
        setPage(0)
    }

    const handleDelete = async (id) => {
        try {
            await deleteClient(id)
            toast.success("tmsah")
            getClients()
        } catch (err) {
            toast.error("invalid id")
            console.log(err)
        }
    }

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
    }

    useEffect(() => {
        getClients()
    }, [page, size, orderBy, order])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Gestion des Produit
                </Typography>
                <Button
                    component={NavLink}
                    to="/dashboard/client/ajoute-produit"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                    + Ajouter un client
                </Button>
            </Box>

            <Box sx={{paddingTop: 7}}/>

            <Paper elevation={3} sx={{width: '100%', overflow: 'hidden', borderRadius: 2}}>
                <Toolbar sx={{bgcolor: '#f8f9fa', borderBottom: '1px solid #e0e0e0'}}>
                    <Typography variant="h6" sx={{flex: '1 1 100%', fontWeight: 'bold', color: '#333'}}>
                        Liste des Clients
                    </Typography>
                </Toolbar>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader hover={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold', bgcolor: '#f1f3f5'}}>
                                    <TableSortLabel
                                        active={orderBy === "nom"}
                                        direction={orderBy === "nom" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("nom")}
                                    />
                                    Nom
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', bgcolor: '#f1f3f5'}}>
                                    <TableSortLabel
                                        active={orderBy === "email"}
                                        direction={orderBy === "email" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("email")}
                                    />
                                    Email
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', bgcolor: '#f1f3f5'}}>
                                    Phone
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', bgcolor: '#f1f3f5'}}>
                                    <TableSortLabel
                                        active={orderBy === "ville"}
                                        direction={orderBy === "ville" ? order.toLowerCase() : "asc"}
                                        onClick={() => handleSort("ville")}
                                    />
                                    City
                                </TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', bgcolor: '#f1f3f5'}}>
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                clients.map((c) => (
                                    <ClientList
                                        key={c.id}
                                        client={c}
                                        handleDelete={()=>executeDelete(c.id,c.nom)}
                                    />
                                ))
                            }
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
        </>
    )
}