import datatable from '../../../styles/datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import swal from 'sweetalert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getProductInformation, editProduct, deleteProduct, columnsProducts, hiddeProduct } from '../../../services/datatableService';


export const DatatableAdminProductos = ({ numRows, Rows }) => {
    const actionColunm = [{
        field: 'action', headerName: 'Acciones', width: 130, renderCell: (params) => {
            return (
                <div className='cellAction d-flex'>
                    <div className='editButton'><a href="#" onClick={(e) => { e.preventDefault(); handleOpen(params.row.id) }}><CreateIcon /></a></div>
                    <div className='DeleteButton ms-3'><a href="#" onClick={(e) => { e.preventDefault(); deleteProductHandling(params.row.id) }}><DeleteIcon /></a></div>
                    <div className='hiddeButotn ms-3'><a href="#" onClick={(e) => { e.preventDefault(); hiddeProductHandling(params.row.id) }}><RemoveRedEyeIcon /></a></div>
                </div>
            )
        }
    }]

    const [open, setOpen] = useState(false);
    const [inputModalValues, setInputModalValues] = useState({

        'name': '',
        'precio_racion': 0,
        'precio_bebida': 0,
        'IVA': 0,
        'Cocina': 0,
        'Activado': 0
    });
    const handleOpen = (id) => {
        getProductInformation(id)
            .then((resultado) => { setInputModalValues(resultado); })
            .catch((error) => {

                throw new error(error);
            })
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleChange = (e) => {

        setInputModalValues({
            ...inputModalValues,
            [e.target.name]: e.target.value
        })
    }

    const editAProduct = (event) => {

        event.preventDefault();
        editProduct(inputModalValues)
            .then((result) => { 
                if(result)
                {
                    setOpen(false); 
                    window.location.reload();
                }
            }).catch((error) => {

                throw new Error(error);
            })

    }

    const deleteProductHandling = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡Los cambios no se podrán revertir!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if (confirmacion) {

                deleteProduct(id).then((resultado) => {
                    if(resultado){

                        swal("Eliminado Correctamente", {
                            icon: "success",
                        }).then((resultadoConfirmacion) => {

                            if (resultadoConfirmacion) {

                                window.location.reload()
                            }
                        });
                    }
                }).catch((error) => {

                    swal("Se ha producido algún error al borrar el producto", {
                        icon: "Warning",
                    });
                    throw new error(error);
                })

            }
        })
    }

    const hiddeProductHandling = (id) => {

        swal({
            title: '¿Estás seguro?',
            text: 'El producto pasará a estar desactivado',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if (confirmacion) {
                hiddeProduct(id)
                    .then((result) => {
                        console.log(result);
                        if(result)
                        {
                            swal("Desactivado Correctamente", {
                            icon: "success",
                            }).then((resultadoConfirmacion) => {

                                if (resultadoConfirmacion) {

                                    window.location.reload()
                                }
                            });
                        }
                    }).catch((error) => {

                        throw new Error(error);
                    })
            }
        })
    }
    return (
        <div className='datatable'>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className='boxModalProduct'>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                        Datos del Producto
                    </Typography>
                    <form onSubmit={editAProduct}>
                        <div className='col-sm-12 d-flex my-3 p-3'>
                            <div className='col-sm-2'>
                                <label className='form-label'>Nombre</label>
                            </div>
                            <input type="text" placeholder='Introduzca el nombre' value={inputModalValues.name} onChange={handleChange} className="form-control text-center modalInputsProducts" name="name" />
                        </div>
                        <div className='col-sm-12 d-flex my-3 p-3'>
                            <div className='col-sm-2'>
                                <label className='form-label'>{inputModalValues.tipo === 8 || inputModalValues.tipo === 9 ? 'Precio Bebida' : 'Precio Ración'}</label>
                            </div>
                            <input type="number" placeholder='Introduzca el precio del producto' value={inputModalValues.tipo === 8 || inputModalValues.tipo === 9 ? inputModalValues.precio_bebida : inputModalValues.precio_racion} onChange={handleChange} className="form-control text-center modalInputsProducts" name={inputModalValues.tipo === 8 || inputModalValues.tipo === 9 ? 'precio_bebida' : 'precio_racion'} step="any" min="0" />
                        </div>
                        <div className='col-sm-12 d-flex my-3 p-3'>
                            <div className='col-sm-2'>
                                <label className='form-label'>IVA</label>
                            </div>
                            <input type="number" placeholder='Introduzca el IVA  del producto' value={inputModalValues.IVA} onChange={handleChange} className="form-control text-center modalInputsProducts" name="IVA" step="any" min="0" />
                        </div>
                        <div className='col-sm-12 d-flex my-3 p-3'>
                            <div className='col-sm-2'>
                                <label className='form-label'>Cocina</label>
                            </div>
                            <select className='form-control text-center modalInputsProducts' value={inputModalValues.Cocina} onChange={handleChange} name="Cocina">
                                <option value={0}>No Cocina</option>
                                <option value={1}>A Cocina</option>
                            </select>
                        </div>
                        <div className='col-sm-12 d-flex my-3 p-3'>
                            <div className='col-sm-2'>
                                <label className='form-label'>Activado</label>
                            </div>
                            <select className='form-control text-center modalInputsProducts' value={inputModalValues.Activado} onChange={handleChange} name="Activado">
                                <option value={0}>Desactivado</option>
                                <option value={1}>Activado</option>
                            </select>
                        </div>
                        <div className='col-sm-12 text-center mt-3'>
                            <button className="btn btn-primary" id="sendButtonModalProduct">Editar</button>
                            <button type="button" className='btn btn-secondary ms-2' onClick={handleClose} id="closeButtonModal">Cerrar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <DataGrid
                rows={Rows ? Rows : []}
                columns={columnsProducts.concat(actionColunm)}
                pageSize={numRows}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}