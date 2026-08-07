
import './App.css'
import Navbar from "./components/Navbar.jsx";
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
                </Route>
            </Route>


        </Routes>
        <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
