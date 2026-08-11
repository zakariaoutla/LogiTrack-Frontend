import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClientInfo from "../components/ClientInfo.jsx";
import {
    Grid,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {useParams} from "react-router-dom";
import {deleteClient, getClient} from "../api/clientService.js";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ClientOrderInfo from "../components/ClientOrderInfo.jsx";
import {getTotalCommandeClient} from "../api/commandeService.js";
import {getAllOrders, getTotalImpaye} from "../api/ligneCommande.js";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import OrderListByClinet from "../components/OrderListByClinet.jsx";

export default function ClientDetails(){
    const [formDat, setFormData]=useState('');
    const[totalCommandeClient, setTotalCommandeClient] = useState(0)
    const [totalImpaye, setTotalImpaye] =useState(0)
    const[tableOrder, setTableOrder]=useState([])
    const [page, setPage]=useState(0)
    const [size, setSize]= useState(5)
    const [order, setOrder]= useState('asc')
    const [orderBy, setOrderBy]=useState('commande.id')
    const [totalElements, setTotalElements] =useState(0)
    const {id} = useParams();

    const fetchClient= async ()=>{
        try {
            const res = await getClient(id)
            setFormData(res.data)
        }catch (err){
            toast.error("Invalid id")
        }
    }
    const fetchTotalCommandeClient = async ()=>{
        try{
            const res = await getTotalCommandeClient(id)
            setTotalCommandeClient(res.data)
        }catch (err){
            toast.error("invalid id")
        }
    }
    const fetchTotalImpaye = async ()=>{
        try{
            const res = await getTotalImpaye(id)
            setTotalImpaye(res.data)
        }catch (err){
            toast.error("Invalid id")
        }
    }
    const fetchAllOrders = async ()=>{
        try{
            const res = await getAllOrders(id,page,size,orderBy,order)
            setTableOrder(res.data.content)
            console.log(res.data.content)
            setTotalElements(res.data.totalElements)
        }catch (err){
            toast.error("invalid id")
        }
    }

    const handleSort = (property)=>{
        const isAsc = orderBy === property && order ==="asc"
        setOrder(isAsc? "desc":"asc")
        setOrderBy(property)
        setPage(0)
    }



    useEffect(()=>{
        fetchClient()
        fetchTotalCommandeClient()
        fetchTotalImpaye()
        fetchAllOrders()
    },[id,page, size,orderBy, order])
    return(
        <>
            <Box sx={{display:'flex', justifyContent:'space-between' ,paddingTop:3}}>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Client Details
                </Typography>
            </Box>
            <Box sx={{paddingTop :7}}/>
            <Box>
                <Grid container spacing={2} columns={16}>
                    <Grid size={5}>
                        <ClientInfo client={formDat}/>
                    </Grid>
                    <Grid size={11}>
                        <ClientOrderInfo Tclient={totalCommandeClient} Timpaye={totalImpaye}/>
                        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>

                            <Toolbar sx={{ bgcolor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                                <Typography variant="h6" sx={{ flex: '1 1 100%', fontWeight: 'bold', color: '#333' }}>
                                    Commandes Récentes
                                </Typography>
                            </Toolbar>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader hover="true">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                                <TableSortLabel
                                                    active={orderBy ==="commande.id"}
                                                    direction={orderBy ==='commande.id'? order.toLowerCase() :"asc" }
                                                    onClick={()=>handleSort("commande.id")}
                                                />
                                                ID Commande
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                                <TableSortLabel
                                                   active={orderBy ==="commande.dateCommande"}
                                                   direction={orderBy ==="commande.dateCommande"? order.toLowerCase(): "asc"}
                                                   onClick={()=>handleSort("commande.dateCommande")}
                                                />
                                                Date
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                                <TableSortLabel
                                                active={orderBy ==="produit.prix"}
                                                direction={orderBy==="produit.prix"? order.toLowerCase():"asc"}
                                                onClick={()=>handleSort("produit.prix")}
                                                />
                                                Montant
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                                <TableSortLabel
                                                active={orderBy==="quantite"}
                                                direction={orderBy === "quantite"? order.toLowerCase():"asc"}
                                                onClick={()=>handleSort("quantite")}
                                                />
                                                Quantite
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                                <TableSortLabel
                                                    active={orderBy==="commande.commandeStatut"}
                                                    direction={orderBy ==="commande.commandeStatut"? order.toLowerCase():"asc"}
                                                    onClick={()=>handleSort('commande.commandeStatut')}
                                                />
                                                Statut
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {tableOrder.map((to)=>(
                                        <OrderListByClinet key={to.id} order={to}/>
                                    ))}
                                </Table>
                            </TableContainer>

                            <TablePagination
                                rowsPerPageOptions={[5,10,20]}
                                component="div"
                                count={totalElements}
                                rowsPerPage={size}
                                page={page}
                                onPageChange={(event, newPage)=> setPage(newPage)}
                                onRowsPerPageChange={(event)=>{
                                    setSize(parseInt(event.target.value, 10))
                                    setPage(0)
                                }}
                                labelRowsPerPage="Rows per page:"
                            />


                        </Paper>

                    </Grid>
                </Grid>


            </Box>


        </>
    )
}