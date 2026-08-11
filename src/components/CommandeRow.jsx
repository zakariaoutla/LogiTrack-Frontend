import { useState } from "react";
import {
    TableRow, TableCell, IconButton, Chip, Tooltip,
    Select, MenuItem
} from "@mui/material";
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const getStatusStyle = (statut) => {
    switch (statut) {
        case 'LIVREE':
            return { color: 'success', label: 'Livrée' };
        case 'EXPEDIEE':
            return { color: 'info', label: 'Expédiée' };
        case 'EN_ATTENTE':
            return { color: 'warning', label: 'En attente' };
        default:
            return { color: 'default', label: statut || 'En attente' };
    }
};

export default function CommandeRow({ commande, onUpdateStatus }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(commande.commandeStatut || 'EN_ATTENTE');

    const statusStyle = getStatusStyle(currentStatus);

    const handleSave = () => {
        if (onUpdateStatus) {
            onUpdateStatus(commande.id, currentStatus);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentStatus(commande.commandeStatut);
        setIsEditing(false);
    };

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
                {isEditing ? (
                    <Select
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        size="small"
                        sx={{ width: '130px' }}
                    >
                        <MenuItem value="EN_ATTENTE">En attente</MenuItem>
                        <MenuItem value="EXPEDIEE">Expédiée</MenuItem>
                        <MenuItem value="LIVREE">Livrée</MenuItem>
                    </Select>
                ) : (
                    <Chip
                        label={statusStyle.label}
                        color={statusStyle.color}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                    />
                )}
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

                {isEditing ? (
                    <>
                        <Tooltip title="Valider" arrow>
                            <IconButton color="success" size="small" onClick={handleSave}>
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Annuler" arrow>
                            <IconButton color="error" size="small" onClick={handleCancel}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <Tooltip title="Modifier le statut" arrow>
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={() => setIsEditing(true)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    );
}