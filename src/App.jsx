
import './App.css'
import Login from "./pages/Login.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from "./components/PublicLayout.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRouter from "./components/GuestRouter.jsx";
import Clients from "./pages/Clients.jsx";
import ClientFormSave from "./pages/ClientFormSave.jsx";
import {ClientFormUpdate} from "./pages/ClientFormUpdate.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";
import Produits from "./pages/Produits.jsx";
import ProduitFormSave from "./pages/ProduitFormSave.jsx";
import {ProduitFormUpdate} from "./pages/ProduitFormUpdate.jsx";
import ProduitDetails from "./pages/ProduitDetails.jsx";
import Commandes from "./pages/Commandes.jsx";
import NouvelleCommande from "./pages/NouvelleCommande.jsx";
import CommandeDetails from "./pages/CommandeDetails.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<PublicLayout/>}>
                <Route element={<GuestRouter/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>

            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<PrivateLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="clients" element={<Clients/>}/>
                    <Route path="/dashboard/clients/ajoute-clients" element={<ClientFormSave/>}/>
                    <Route path="/dashboard/clients/update-client/:id" element={<ClientFormUpdate/>}/>
                    <Route path="/dashboard/clients/client-detail/:id" element={<ClientDetails/>}/>
                    <Route path="produits" element={<Produits/>}/>
                    <Route path="/dashboard/produits/ajoute-produit" element={<ProduitFormSave/>}/>
                    <Route path="/dashboard/produits/update-produit/:id" element={<ProduitFormUpdate/>}/>
                    <Route path="/dashboard/produits/produit-detail/:id" element={<ProduitDetails/>}/>

                    <Route path="orders" element={<Commandes/>}/>
                    <Route path="/dashboard/commandes/nouvelle" element={<NouvelleCommande/>}/>
                    <Route path="/dashboard/commandes/detail/:id" element={<CommandeDetails/>}/>

                </Route>
            </Route>


        </Routes>
        <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
