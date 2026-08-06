import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardCard from "../components/DashboardCard.jsx";
import {useEffect, useState} from "react";
import {getTotalClient} from "../api/cliantService.js";
import {getTotalProduit} from "../api/produitService.js";
import {getTotalOrder} from "../api/commandeService.js";
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Dashboard(){
    const [totalClient, setTotalClient] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [lowStockAlert, setLowStockAlert] = useState(0)


    const totalClients = async ()=>{
        try{
            const res = await getTotalClient()
            setTotalClient(res.data)
        }catch (err){
            console.log(err)
        }
    }

    const totalProduit = async ()=>{
        try{
            const res = await getTotalProduit()
            setTotalProducts(res.data)
        }catch (err){
            console.log(err)
        }
    }
    const totalOrder = async ()=>{
        try{
            const res = await getTotalOrder()
            setTotalOrders(res.data)
            console.log(res.data)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        totalClients()
        totalProduit()
        totalOrder()
    },[]);

    const elementCard = [
        {number:totalClient, text: "Total Clients", desc:"Clients", icon:<GroupIcon sx={{ color: '#111827' }} /> },
        {number:totalProducts, text: "Total Products", desc: "Products", icon: <Inventory2Icon sx={{color:'#111827'}} />},
        {number: totalOrders, text: "Total Orders", desc: "Orders", icon:<ListAltIcon sx={{color:'#111827'}}/> }
    ]



    return(
        <>
            <Box>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Dashboard
                </Typography>

            </Box>
            <Box sx={{paddingTop :4}}/>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                {
                    elementCard.map((item)=>(
                        <DashboardCard total={item.number} title={item.text} desc={item.desc} icon={item.icon}/>
                    ))
                }
            </Box>

        </>
    )
}