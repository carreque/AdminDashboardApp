import { DatatableMesas } from "../Dashboard/DatatableMesas";
import { Navbar } from "../Dashboard/Navbar";
import { Sidebar } from "../Dashboard/Sidebar";
import { useState } from 'react';
import { useEffect } from 'react';
import { createNewTable, getAllTables } from "../../../services/datatableService";
import { Box, Modal } from "@mui/material";
import tables from '../../../styles/tables.css';
import swal from 'sweetalert'

export const TablesAdmin = () => {

    const [tables, setTables] = useState(null);
    const [open, setOpen] = useState(false);
    const [numRows, setNumRows] = useState(5);
    const handleClose = () => { setOpen(false)};
    const handleOpen = () => {setOpen(true)};
    const [tableData, setTableData] = useState({
        'name': '',
        'activa': 0,
        'estado': 0,
        'comensales': 0
    });
    useEffect(() => {

        getAllTables()
        .then((resultado) => {
            setTables(resultado);
        }).catch((error) => {
            throw new Error(error);
        })
    }, []);

    const handleChangePages = (e) => {

        setNumRows(parseInt(e.target.value));
    }

    const handleNewData = (e) => {

        setTableData({...tableData,
            [e.target.name]: e.target.value
        })
    }

    const handleNewTable = (e) => {

        e.preventDefault();
        createNewTable(tableData)
        .then((resultado) => {

            if(resultado != 'Se ha producido un error al crear una mesa'){

                swal("Creado Correctamente", {
                    icon: "success",
                }).then((resultadoConfirmacion) => {

                    if(resultadoConfirmacion){

                        window.location.reload()
                        setOpen(false);
                    }
                });  
            }

        }).catch((error) => {

            throw new Error(error);
        })
    }
    return (
        <div className="d-flex">
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="boxTableAdmin">
                    <form onSubmit={handleNewTable}>
                        <div className="form-group">
                            <h4 className="text-center">Datos nueva mesa</h4>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-6 text-center">
                                <label className="form-label">Nombre</label>
                            </div>
                            <div className="col-6 text-center">
                                <label className="form-label">Estado</label>
                            </div>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-6 p-3">
                                <input type="text" className="form-control text-center" name="name" onChange={handleNewData}/>
                            </div>
                            <div className="col-6 p-3">
                                <select className="form-control text-center" name="estado" onChange={handleNewData}>
                                    <option value={0}>Desactivada</option>
                                    <option value={1}>Activada</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 d-flex mt-3">
                            <div className="col-6 text-center">
                                <label className="form-label">Activa</label>
                            </div>
                            <div className="col-6 text-center">
                                <label className="form-label">Comensales</label>
                            </div>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-6 text-center p-3">
                                <select className="form-control text-center" name="activa" onChange={handleNewData}>
                                    <option value={0}>Desocupada</option>
                                    <option value={1}>Ocupada</option>
                                </select>
                            </div>
                            <div className="col-6 text-center p-3">
                                <input type="number" className="form-control text-center" name="comensales" onChange={handleNewData}/>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary ms-3" onClick={handleClose}>Cerrar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Sidebar/>
            <div className="w-100">
                <Navbar/>
                <div>
                    <div className="col-12 d-flex">
                        <div className="col-6 d-flex p-3">
                            <label className="form-label">Número de Páginas: </label>
                            <select className='form-control ms-3 text-center inputBills' id="filterBillsPages" onChange={(e) => handleChangePages(e)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="col-6 text-end p-3">
                            <button className="btn btn-primary" onClick={handleOpen}>Crear</button>
                        </div>
                    </div>
                    <DatatableMesas Rows={tables} numRows={numRows}/>
                </div>
            </div>
        </div>
    );
}