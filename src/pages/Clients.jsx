import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClientList from "../components/ClientList.jsx";
import {Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {useEffect, useState} from "react";
import {getAllClients} from "../api/cliantService.js";

export default function Clients(){
    const[clients, setClients] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [page, setPage]=useState(0)
    const [size, setSize]= useState(5)
    const [sort, setSort]= useState('ASC')

    const getClients = async ()=>{
        try{
            const res = await getAllClients(page,size)
            setClients(res.data.content)
            setTotalElements(res.data.totalElements)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getClients()
    },[page, size])


    return(
        <>
            <Box>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Clients
                </Typography>

            </Box>
            <Box sx={{paddingTop :4}}/>


            <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>

                <Toolbar sx={{ bgcolor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ flex: '1 1 100%', fontWeight: 'bold', color: '#333' }}>
                        Liste des Clients
                    </Typography>
                </Toolbar>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader hover="true">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                    Nom
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                    Email
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                    Phone
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                    City
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f1f3f5' }}>
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                {
                    clients.map((c)=>(
                        <ClientList key={c.id} client={c}/>
                    ))
                }
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
        </>
    )
}