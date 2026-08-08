import {
    TableBody, TableCell,
    TableRow, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";


export default function ClientList({client}) {

    return (
                    <TableBody>
                            <TableRow hover>
                                <TableCell>{client.nom}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.telephone}</TableCell>
                                <TableCell>{client.ville}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="info" size="small">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="primary" size="small" component={NavLink} to={`/dashboard/clients/update-client/${client.id}`}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                    </TableBody>
    );
}