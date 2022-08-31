import { useState, useEffect } from 'react';
import prices from '../../../styles/prices.css';
import swal from 'sweetalert';
import { Sidebar } from '../Dashboard/Sidebar';
import { Navbar } from '../Dashboard/Navbar';
import { DatatableAdminProductos } from '../Dashboard/DatatableProductos';
import { getAllProducts, getProductsOfACategory } from '../../../services/productsAdminService';
import { getCategories } from '../../../services/homeAdminService';
import { handleTypeOfIncrease, changeIva, changePrices} from '../../../services/preciosAdminService';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PreciosAdmin = () => {

    const [mostrarSegundoModal, setMostrarSegundoModal] = useState('none');
    const [mostrarPrimerModal, setMostrarPrimerModal] = useState('none');
    const [open, setOpen] = useState(false);
    const [numPages, setPages] = useState(5);
    const [selectorValor, setValorSelector] = useState(0);
    const [Productos, SetProductos] = useState(null);
    const [Categorias, setCategorias] = useState(null);

    useEffect(() => {
        Promise.all([
            getAllProducts(),
            getCategories()
        ]).then((resultado) => {
            SetProductos(resultado[0]);
            setCategorias(resultado[1]);
        }).catch((error) => {

            throw new Error(error);
        })
    }, []);
    
    const handleChangeCategorias = (e) =>{  
        
        setValorSelector(e);
        getProductsOfACategory(e)
        .then((result) => { SetProductos(result)})
        .catch((error) => {

            throw new Error(error);
        })
    }

    const handleClose = () => setOpen(false); 
    const handleOpen = (string) => {

        const settingsOpen = handleTypeOfIncrease(string);
        setMostrarPrimerModal(settingsOpen[0]);
        setMostrarSegundoModal(settingsOpen[1]);
        setOpen(true);
    };
    const [newIva, setNewIva] = useState(0);
    const [newPrices, setNewPrices] = useState(0);
    const handleNewIva = (event) => {

        event.preventDefault();
        setOpen(false);
        swal({
            title: "¿Estás seguro?",
            text: `¡El iva se incrementará un ${newIva}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){

                changeIva(selectorValor, newIva)
                    .then((resultado) => {

                        if(resultado){

                            swal("Iva Cambiado Correctamente", {
                                icon: "success",
                            }).then((resultadoConfirmacion) => {
    
                                if(resultadoConfirmacion){
    
                                    window.location.reload()
                                }
                            });   
                        }
                    }
                )
            }
        })
    }

    const handleNewPrice = (event) => {

        event.preventDefault();
        setOpen(false);
        swal({
            title: "¿Estás seguro?",
            text: `¡El precio se incrementará un ${newPrices}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((result) => {

            if(result){

                changePrices(selectorValor, newPrices)
                    .then((resultado) => {

                        if(resultado){

                            swal("Precio Cambiado Correctamente", {
                                icon: "success",
                            }).then((resultadoConfirmacion) => {
    
                                if(resultadoConfirmacion){
    
                                    window.location.reload()
                                }
                            });   
                        }
                    }
                )
            }
        })
    }
    return (

        <div className='homePrices'>
            <Sidebar/>
            <div className='containerPrices'>
                <Navbar/>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='boxIncrementPrice'>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Introduzca la cantidad a modificar
            </Typography>
                <form style={{display: `${mostrarPrimerModal}`}} onSubmit={handleNewPrice}>
                    <div className='col-sm-12 text-center my-3'>
                        <input type="number" className='form-control text-center fieldPriceModal' step="any" value={newPrices} onChange={(e) => {setNewPrices(e.target.value)}}/>
                    </div>
                    <div className='col-sm-12 text-center mt-2'>
                        <button className='btn btn-danger buttonsChangePriceIVA'>Enviar</button>
                        <button type="button" className='btn btn-secondary ms-2 buttonsChangePriceIVA' onClick={handleClose}>Cerrar</button>
                    </div>
                </form>
                <form style={{display: `${mostrarSegundoModal}`}} onSubmit={handleNewIva}>
                    <div className='col-sm-12 text-center my-3'>
                        <input type="number" className='form-control text-center fieldPriceModal' step="any" value={newIva} onChange={(e) => {setNewIva(e.target.value)}}/>
                    </div>
                    <div className='col-sm-12 text-center mt-2'>
                        <button className='btn btn-danger buttonsChangePriceIVA'>Enviar</button>
                        <button type="button" className='btn btn-secondary ms-2 buttonsChangePriceIVA' onClick={handleClose}>Cerrar</button>
                    </div>
                </form>
            </Box>
            </Modal>
                <div className='col-sm-12 d-flex mt-3'>
                    <div className="col-sm-6 d-flex">
                        <div className='col-sm-3 p-2 ms-2'>
                            <label className='form-label'>Número de Páginas: </label>
                        </div>
                        <select className='form-control selectPages text-center' onClick={(e) => {setPages(e.target.value)}}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className='col-sm-6 d-flex'>
                        <div className='col-sm-3 p-2 ms-2'>
                            <label className='form-label'>Categorías: </label>
                        </div>
                            <select className='form-control selectPages text-center' onClick={(e) => {handleChangeCategorias(e.target.value)}}>
                                <option key={0} value={0}>Todos</option>
                                {
                                    Categorias?.map((categoria) => {
                                        return (<option key={categoria.id} value={categoria.id}>{categoria.name}</option>)
                                    })
                                }
                            </select>
                    </div>
                </div>
                <div className='col-sm-12 text-center mt-3'>
                    <button className='btn btn-danger buttonsChangePriceIVA' onClick={(e) => {handleOpen('Precio')}}>Incrementar Precio</button>
                    <button className='btn btn-danger ms-2 buttonsChangePriceIVA' onClick={(e) => {handleOpen('IVA')}}>Incrementar IVA</button>
                </div>
                <DatatableAdminProductos numRows={parseInt(numPages)} Rows={Productos}/>
            </div>
        </div>
    )
}