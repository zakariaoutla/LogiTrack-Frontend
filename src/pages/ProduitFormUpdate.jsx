import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {getProduit, putProduit} from "../api/produitService.js";
import ProductForm from "../components/ProductForm.jsx";

export function ProduitFormUpdate() {
    const [formData, setFormData] = useState({})
    const {id} = useParams()

    const fetchProduit = async () => {
        try {
            const res = await getProduit(id)
            setFormData(res.data)
        } catch (err) {
            toast.error("invalid client");
        }
    }

    useEffect(() => {
        if (id) {
            fetchProduit()
        }
    }, [id])

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }


    const updateProduit = async (e) => {
        e.preventDefault()
        try {
            const res = await putProduit(id, formData)
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
                    Update un Produit
                </Typography>
            </Box>
            <Box sx={{paddingTop: 2}}/>

            <ProductForm handleSubmit={updateProduit} handleChange={handleChange} formData={formData}/>
        </>
    )
}