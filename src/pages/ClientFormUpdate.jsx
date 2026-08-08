import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getClient, putClient} from "../api/cliantService.js";
import {useParams} from "react-router-dom";
import ClientForm from "../components/ClientForm.jsx";

export function ClientFormUpdate() {
    const [formData, setFormData] = useState({})
    const {id} = useParams()

    const fetchClient = async () => {
        try {
            const res = await getClient(id)
            setFormData(res.data)
            console.log(res.data)
        } catch (err) {
            toast.error("invalid client");
        }
    }

    useEffect(() => {
        if (id) {
            fetchClient()
        }
    }, [id])

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }


    const updateClient = async (e) => {
        e.preventDefault()
        try {
            const res = await putClient(id, formData)
            setFormData(res.data)
            toast.success("update success")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', paddingTop: 3}}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    Update un Client
                </Typography>
            </Box>
            <Box sx={{paddingTop: 2}}/>

            <ClientForm handleSubmit={updateClient} handleChange={handleChange} formData={formData}/>
        </>
    )
}