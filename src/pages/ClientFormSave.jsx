import ClientForm from "../components/ClientForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {postClient} from "../api/cliantService.js";
import {toast} from "react-toastify";


export default function ClientFormSave(){
    const [fromData, setFormData] = useState({
        nom:"",
        email:"",
        telephone: "",
        ville:""
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
            const res = await postClient(fromData)
            setFormData({nom: '',email:'',telephone: '',ville: ''})
            toast.success("Client add success")
        }catch (err){
            toast.error("Error")
        }
    }



    return(
        <>
            <Box sx={{display:'flex', justifyContent:'space-between' ,paddingTop:3}}>
                <Typography variant="h4"  sx={{fontWeight:'bold'}}>
                    Ajouter un Client
                </Typography>
            </Box>
            <Box sx={{paddingTop :2}}/>
        <ClientForm handleChange={handleChange} handleSubmit={handleSubmit} formData={fromData}/>
        </>
    )
}