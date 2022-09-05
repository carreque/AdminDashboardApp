import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Dashboard/Navbar";
import { Sidebar } from "../Dashboard/Sidebar";
import orderBill from "../../../styles/orderBill.css"
import { getInfoBill, formatInfoOrder, incrementProduct, decrementProduct} from "../../../services/billsService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

export const OrderBillAdmin = () => {

    const location = useLocation();
    const idBill = location.state?.idBill;
    const [comanda, setComanda] = useState([]);
    let totalBill = 0;
    let totalProducts = 0;

    useEffect(() => {
        getInfoBill(idBill)
        .then((resultado) => {
            setComanda(formatInfoOrder(Array.isArray(resultado) ? resultado : []));
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, []);
   
    const incrementProductQuantity = (id, idFactura) => {

        incrementProduct(id, idFactura)
        .then((resultado) => {
            console.log(resultado);
            if(resultado === 'Fila Actualizada Correctamente'){

                swal("Actualizado Correctamente", {
                    icon: "success",
                }).then((resultadoConfirmacion) => {

                    if (resultadoConfirmacion) {

                        window.location.reload()
                    }
                });
            }
        })
        .catch((error) => {

            throw new Error(error);
        })
    }

    const decrementProductQuantity = (id, idFactura) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡Se decrementará el producto seleccionado!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){

                decrementProduct(id, idFactura)
                .then((response) => {

                    if(response === 'Fila Actualizada Correctamente'){

                        swal("Actualizado Correctamente", {
                            icon: "success",
                        }).then((resultadoConfirmacion) => {

                            if (resultadoConfirmacion) {

                                window.location.reload()
                            }
                        });
                    }
                })
                .catch((error) => {

                    throw new Error(error);
                })
            }
        })
        
    }
    return (<div className="d-flex">
        <Sidebar/>
        <div className="OrderContainer">
            <Navbar/>
            <TableContainer className="p-3">
               <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Iva</TableCell>
                            <TableCell>Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                           comanda[0]?.map((item, index) => {
                            totalBill += comanda[1][index] * comanda[2][index];
                            totalProducts += comanda[1][index];
                            return(
                                <TableRow  key={index}>
                                     <TableCell component="th" scope="row">{item}</TableCell>
                                     <TableCell component="th" scope="row">{comanda[1][index]}</TableCell>
                                     <TableCell component="th" scope="row">{comanda[2][index]} €</TableCell>
                                     <TableCell component="th" scope="row">{comanda[3][index]}</TableCell>
                                     <TableCell component="th" scope="row">
                                        <button className="btn btn-primary" onClick={(e) => incrementProductQuantity(comanda[4][index], idBill)}><AddIcon/></button>
                                        <button className="btn btn-danger ms-2" onClick={(e) => decrementProductQuantity(comanda[4][index], idBill)}><RemoveIcon/></button>
                                    </TableCell>
                                </TableRow>
                            )
                            })            
                        }
                    <TableRow  key={Array.isArray(comanda) ? comanda[0]?.length +1 : 0}>
                                     <TableCell component="th" scope="row">Total</TableCell>
                                     <TableCell component="th" scope="row">{totalProducts}</TableCell>
                                     <TableCell component="th" scope="row">{totalBill} €</TableCell>
                                     <TableCell component="th" scope="row"></TableCell>
                                     <TableCell component="th" scope="row"></TableCell>
                                </TableRow>
                    </TableBody>
               </Table>
            </TableContainer>
            <div className="col-12 text-center">
                <Link to={'/admin/bills'}><button className="btn btn-primary">Volver</button></Link>
            </div>
        </div>
       
    </div>)
}