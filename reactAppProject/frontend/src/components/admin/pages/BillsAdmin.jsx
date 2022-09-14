import { Navbar } from '../Dashboard/Navbar';
import { Sidebar } from '../Dashboard/Sidebar';
import bills from '../../../styles/bills.css';
import { useState } from 'react';
import { filterOrders, getAllBills} from '../../../services/billsService';
import { useEffect } from 'react';
import { DatatableBills } from '../Dashboard/DatatableBills';
import { Modal } from '@mui/material';
import {Box} from '@mui/material';

const inicialState = {
    'fechaInicio': '',
    'fechaFin': '',
    'referencia': '',
    'numMesa': ''
}
export const BillsAdmin = () => {

    const [numPagesBills, setNumPagesBills] = useState(5);
    const [bills, setBills] = useState(null);
    const [open, setOpen] = useState(false);
    const [filterValues, setFilteredValues] = useState(inicialState);
    useEffect(() => {

        getAllBills()
            .then((result) => {
                setBills(result)})
            .catch((error) => {
                throw new Error(error)
            })
    }, []);

    const handleChangePages = (e) => {

        setNumPagesBills(e.target.value);
    }

    
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    const handleChangeFilterValues = (e) => {

        setFilteredValues({
            ...filterValues,
            [e.target.name]: e.target.value
        })
    }
    const handleFiltered = (e) => {

        e.preventDefault();
        console.log(filterValues);
        filterOrders(filterValues)
        .then((resultado) => {
            console.log(resultado);
            setBills(resultado);
            setFilteredValues(inicialState);
        })           
        .catch((error) => {

            throw new Error(error);
        })

    }
    return (
        <div className='d-flex'>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modalBoxBills">
                    <form onSubmit={handleFiltered}>
                        <h4 className='p-3 text-center'>Introduzca los filtros por los que quiere filtrar</h4>
                        <div className='col-12 d-flex'>
                            <div className='col-6 text-center'>
                                <label className="form-label">Fecha Inicio</label>
                            </div>
                            <div className='col-6 text-center'>
                                <label className="form-label">Fecha Fin</label>
                            </div>
                        </div>
                        <div className='col-12 d-flex'>
                            <div className="col-6 text-center p-2">
                                <input type="date" className="form-control inputBills" name="fechaInicio" required={true} onChange={handleChangeFilterValues} value={filterValues.fechaInicio}/>
                            </div>
                            <div className="col-6 text-center p-2">
                                <input type="date" className="form-control inputBills" name="fechaFin" required={true} onChange={handleChangeFilterValues} value={filterValues.fechaFin}/>
                            </div>
                        </div>
                        <div className='col-12 d-flex'>
                            <div className='col-6 text-center'>
                                <label className="form-label">Referencia</label>
                            </div>
                            <div className='col-6 text-center'>
                                <label className="form-label">Número Mesa</label>
                            </div>
                        </div>
                        <div className='col-12 d-flex'>
                            <div className="col-6 text-center p-2">
                                <input type="text" className="form-control inputBills" name="referencia" onChange={handleChangeFilterValues} value={filterValues.referencia}/>
                            </div>
                            <div className="col-6 text-center p-2">
                                <input type="number" className="form-control inputBills" name="numMesa" onChange={handleChangeFilterValues} value={filterValues.numMesa}/>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button className='btn btn-primary me-3 buttonBills'>Enviar</button>
                            <button type="button" className="btn btn-secondary buttonBills" onClick={handleClose}>Cerrar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Sidebar/>
            <div className='billsContainer'>
                <Navbar/>
                <div className='col-12 d-flex'>
                    <div className="col-6 d-flex p-4">
                        <label className="form-label p-1">Número de Páginas: </label>
                        <select className='form-control ms-3 text-center inputBills' id="filterBillsPages" onChange={(e) => handleChangePages(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="col-6 text-end p-4">
                        <button className="btn btn-primary me-5 buttonBills" id="dateFiltrado" onClick={handleOpen}>Filtrar</button>
                    </div>
                </div>

                <DatatableBills numRows={numPagesBills} Rows={bills}/>
            </div>
        </div>
    )
}