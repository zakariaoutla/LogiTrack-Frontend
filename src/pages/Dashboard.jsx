import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardCard from "../components/DashboardCard.jsx";
import {useEffect, useState} from "react";
import {getTotalClient} from "../api/clientService.js";
import {getLowStockAlert, getTotalProduit} from "../api/produitService.js";
import {countByStatus, getTotalOrder} from "../api/commandeService.js";
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Dashboard(){
    const [totalClient, setTotalClient] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [lowStockAlert, setLowStockAlert] = useState(0)
    const [orderStats, setOrderStats] = useState({
        enAttente: 0,
        expediees: 0,
        livrees: 0
    });



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
    const fetchStockFible= async ()=>{
        try{
            const res = await getLowStockAlert()
            setLowStockAlert(res.data.length)
        }catch (err){
            console.log(err)
        }
    }

    const fetchcountStatus= async ()=>{
        try{
            const res = await countByStatus()
            setOrderStats(res.data)
            console.log(res.data)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        totalClients()
        totalProduit()
        totalOrder()
        fetchStockFible()
        fetchcountStatus()
    },[]);

    const elementCard = [
        {number:totalClient, text: "Total Clients", desc:"Clients", icon:<GroupIcon sx={{ color: '#111827' }} /> },
        {number:totalProducts, text: "Total Products", desc: "Products", icon: <Inventory2Icon sx={{color:'#111827'}} />},
        {number: totalOrders, text: "Total Commandes", desc: "Commandes", icon:<ListAltIcon sx={{color:'#111827'}}/> },
        {number: orderStats.enAttente, text: "En attente", desc: "En attente", icon:<ListAltIcon sx={{color:'#111827'}}/>},
        {number: orderStats.expediees, text: "Expédiées", desc: "Expédiées", icon:<ListAltIcon sx={{color:'#111827'}}/>},
        {number: orderStats.livrees, text: "Livrées", desc: "Livrées", icon:<ListAltIcon sx={{color:'#111827'}}/>},
        {number: lowStockAlert, text: "Stock faible", desc: "Stock", icon:<ListAltIcon sx={{color:'#111827'}}/>}
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
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: '16px'
            }}>
                {
                    elementCard.map((item, index)=>(
                        <DashboardCard
                            key={index}
                            total={item.number}
                            title={item.text}
                            desc={item.desc}
                            icon={item.icon}
                        />
                    ))
                }
            </Box>

        </>
    )
}