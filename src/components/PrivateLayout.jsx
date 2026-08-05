import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Topbar from "./Topbar.jsx";

export default function PrivateLayout() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 240px)'
                }}
            >
                <Box sx={{ height: '56px', borderBottom: '1px solid #BFC7D2', backgroundColor: '#F7F9FB', zIndex: 10 }}>
                    <Topbar/>
                </Box>

                <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>

        </Box>
    );
}