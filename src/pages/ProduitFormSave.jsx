import ClientForm from "../components/ClientForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {toast} from "react-toastify";
import {postProduit} from "../api/produitService.js";
import ProductForm from "../components/ProductForm.jsx";


export default function ProduitFormSave(){
    const [fromData, setFormData] = useState({
        nom:"",
        categorie:"",
        prix: 0,
        quantiteStock:0
    })

    const handleChange = (e)=>{
        setFormData({
            ...fromData,
            [e.target.name]:e.target.value
        })
    }

    const  handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await postProduit(fromData)
            setFormData({nom: '',categorie:'',prix: '',quantiteStock: ''})
            toast.success("Produit add success")
        }catch (err){
            toast.error("Error")
        }
    }



    return(
        <>
            <Box sx={{display:'flex', justifyContent:'space-between' ,paddingTop:3}}>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Ajouter un Produit
                </Typography>
            </Box>
            <Box sx={{paddingTop :2}}/>
            <ProductForm handleChange={handleChange} handleSubmit={handleSubmit} formData={fromData}/>
        </>
    )
}