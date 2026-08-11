import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductList({ product, handleDelete }) {
    return (
        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={{ color: 'text.secondary' }}>#{product.id}</TableCell>
            <TableCell sx={{ fontWeight: 500 }}>{product.nom}</TableCell>
            <TableCell>{product.categorie}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {product.prix} dhs
            </TableCell>
            <TableCell>{product.quantiteStock}</TableCell>
            <TableCell align="center">
                <Tooltip title="Voir les détails" arrow>
                    <IconButton
                        color="info"
                        size="small"
                        component={NavLink}
                        to={`/dashboard/produits/produit-detail/${product.id}`}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Modifier le produit" arrow>
                    <IconButton
                        color="primary"
                        size="small"
                        component={NavLink}
                        to={`/dashboard/produits/update-produit/${product.id}`}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer" arrow>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}