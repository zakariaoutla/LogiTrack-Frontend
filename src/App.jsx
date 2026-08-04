
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>

        <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
