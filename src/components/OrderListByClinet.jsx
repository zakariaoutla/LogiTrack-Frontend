import {Chip, TableBody, TableCell, TableRow} from "@mui/material";

export default function OrderListByClinet({order}){
    const getStatusStyle = (statut) => {
        switch (statut) {
            case 'LIVREE':
                return { color: 'success', label: 'Livrée' };
            case 'EN_ATTENTE':
                return { color: 'warning', label: 'EN_ATTENTE'};
            case 'EXPEDIEE':
                return { color: 'error', label: 'EXPEDIEE' };
            default:
                return { color: 'default', label: statut || 'EN_ATTENTE' };
        }
    };
    const statusStyle = getStatusStyle(order.commandeStatut);
    return(
        <>
            <TableBody>
                <TableRow hover>
                    <TableCell sx={{textAlign:"center"}}>{order.commandeId}</TableCell>
                    <TableCell sx={{textAlign:"center"}}>{order.dateCommande}</TableCell>
                    <TableCell sx={{textAlign:"center"}}>{order.montantTotal}DH</TableCell>
                    <TableCell sx={{textAlign:"center"}}>{order.quantite}</TableCell>
                    <TableCell sx={{textAlign:"center"}}>
                        <Chip
                            label={statusStyle.label}
                            color={statusStyle.color}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    )
}