import Box from "@mui/material/Box";
import {Avatar, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ClientInfo({client}){

    return(
        <>
        <Box sx={{backgroundColor:'#ffff', padding:'10px',border: '1px solid #e0e0e0',borderRadius: 2}}>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Avatar sx={{ bgcolor: '#1E3A5F',height:"100px", width:"100px", borderRadius:3 }} variant="square">
                    {client?.nom?.charAt(0) ?? ''}
                </Avatar>
                <Typography variant="h5" sx={{marginTop:'15px'}}>
                    {client?.nom}
                </Typography>
            </Box>
            <Divider sx={{marginTop:"15px"}}/>
            <Box sx={{display:'flex',alignItems:'center',gap:'10px', marginTop:'10px'}}>
                <EmailIcon sx={{color:'#45474C',fontSize:'30px'}}/>
                <Typography variant="h6">
                    {client?.email}
                </Typography>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',gap:'10px', marginTop:'15px'}}>
                <PhoneIcon sx={{color:'#45474C',fontSize:'30px'}}/>
                <Typography variant="h6">
                    {client?.telephone}
                </Typography>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',gap:'10px', marginTop:'15px'}}>
                <LocationOnIcon sx={{color:'#45474C',fontSize:'30px'}}/>
                <Typography variant="h6">
                    {client?.ville}
                </Typography>
            </Box>

        </Box>

        </>
    )
}