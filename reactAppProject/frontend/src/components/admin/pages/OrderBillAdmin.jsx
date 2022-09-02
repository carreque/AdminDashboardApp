import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Dashboard/Navbar";
import { Sidebar } from "../Dashboard/Sidebar";
import orderBill from "../../../styles/orderBill.css"

export const OrderBillAdmin = () => {

    const location = useLocation();
    const idBill = location.state?.idBill;
    const [comanda, setComanda] = useState(null);
    
    return (<div className="d-flex">
        <Sidebar/>
        <div className="OrderContainer">
            <Navbar/>
            <div>
                Hola estoy aqui {idBill}
            </div>
        </div>
       
    </div>)
}