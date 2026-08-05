import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";

export default function PublicLayout(){
    return(
        <>
          <Navbar/>

            <main>
                <Outlet/>
            </main>
        </>
    )
}