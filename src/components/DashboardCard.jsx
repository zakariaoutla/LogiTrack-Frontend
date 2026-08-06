import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DashboardCard({total, title,desc, icon}){
    return(
        <>

            <Card
                sx={{
                    maxWidth: 322,
                    width:322,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e0e0e0'
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ color: '#004282', fontWeight: 600, mt: 0.5 }}
                        >
                            {title}
                        </Typography>

                        <Box
                            sx={{
                                bgcolor: '#f5f5f5',
                                p: 1,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {icon}
                        </Box>
                    </Box>

                    <Box
                    sx={{display:'flex', gap:'10px'}}
                    >
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, mb: 1, color: '#111827', letterSpacing: '-0.02em' }}

                        >
                            {total}
                        </Typography>
                        <span style={{display: 'flex', alignItems:'center', color:'#64B981', fontWeight:'bold'}}>/{desc}</span>
                    </Box>

                </CardContent>
            </Card>
        </>
    )
}