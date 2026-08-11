import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ConfirmDelete({name, onConfirm,closeToast}){
    return(
        <>
            <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {`Voulez-vous vraiment supprimer ce ${name} ?`}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                            onConfirm();
                            closeToast();
                        }}
                    >
                        Oui
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={closeToast}
                    >
                        Non
                    </Button>
                </Box>
            </Box>

        </>
    )
}