import { TableRow, TableCell, IconButton, Chip, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export default function CommandeRow({ commande }) {

    const getStatusStyle = (statut) => {
        switch (statut) {
            case 'LIVREE':
                return { color: 'success', label: 'Livrée' };
            case 'EN_ATTENTE':
                return { color: 'warning', label: 'EN_ATTENTE' };
            case 'EXPEDIEE':
                return { color: 'error', label: 'EXPEDIEE' };
            default:
                return { color: 'default', label: statut || 'EN_ATTENTE' };
        }
    };

    const statusStyle = getStatusStyle(commande.commandeStatut);

    return (
        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                #{commande.id}
            </TableCell>

            <TableCell sx={{ fontWeight: 500 }}>
                {commande.clientNom}
            </TableCell>

            <TableCell>
                {commande.dateCommande}
            </TableCell>

            <TableCell>
                <Chip
                    label={statusStyle.label}
                    color={statusStyle.color}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                />
            </TableCell>

            <TableCell align="center">
                <Tooltip title="Gérer la commande" arrow>
                    <IconButton
                        color="info"
                        size="small"
                        component={NavLink}
                        to={`/dashboard/commandes/detail/${commande.id}`}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Modifier le statut" arrow>
                    <IconButton
                        color="primary"
                        size="small"
                        component={NavLink}
                        to={`/dashboard/commandes/update/${commande.id}`}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}