import Box from "@mui/material/Box";
import {
    Grid
} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ClientOrderInfo({Tclient, Timpaye}){
    return(
        <>
        <Box>
            <Grid container spacing={10} columns={16}>
                <Grid size={8} sx={{border: '1px solid #e0e0e0',borderRadius: 2, backgroundColor:'#ffff', padding:'10px'}}>
                    <Typography variant="h6">
                        Total Commandes
                    </Typography>
                    <Typography variant="h3" sx={{fontWeight:'bold', marginTop:'20px'}}>
                        {Tclient}
                    </Typography>
                </Grid>
                <Grid size={8} sx={{border: '1px solid #e0e0e0',borderRadius: 2, backgroundColor:'#ffff', padding:'10px'}}>
                    <Typography variant="h6">
                        Solde Impayé
                    </Typography>
                    <Typography variant="h3" sx={{fontWeight:'bold', marginTop:'20px'}}>
                        {Timpaye || "0"}DH
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{marginTop:"20px"}}/>
        </Box>


        </>
    )
}