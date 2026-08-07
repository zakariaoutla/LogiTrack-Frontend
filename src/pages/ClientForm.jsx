import ClientForm from "../components/ClientForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function ClientFormPage(){
    return(
        <>
            <Box sx={{display:'flex', justifyContent:'space-between' ,paddingTop:3}}>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Ajouter un produit
                </Typography>
            </Box>
            <Box sx={{paddingTop :2}}/>
        <ClientForm/>
        </>
    )
}