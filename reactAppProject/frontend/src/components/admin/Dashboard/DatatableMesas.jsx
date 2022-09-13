import datatable from '../../../styles/datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { columnsTables, deactivateTableSelected, deleteTable, editDataTable, getTable } from '../../../services/datatableService';
import BlockIcon from '@mui/icons-material/Block';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert'
import { useState } from 'react';

export const DatatableMesas = ({numRows, Rows}) => {

    const actionColunm = [{
        field: 'action', headerName: 'Acciones', width: 230, renderCell: (params) => {
            return (
                <div className='cellAction d-flex'>
                    <div className='editButton'><button type="button" className='btn btn-primary' onClick={(e) => {handleOpen(params.row.id)}}><CreateIcon /></button></div>
                    <div className='DeleteButton ms-3'><button type="button" className='btn btn-primary' onClick={(e) => {handleDeleteTable(params.row.id)}}><DeleteIcon /></button></div>
                    <div className='hiddeButotn ms-3'><button className='btn btn-primary' onClick={(e) => {handleDeactivateTable(params.row.id)}}><BlockIcon/></button></div>
                </div>
            )
        }
    }];

    const [dataTableValues, setDataTableValues] = useState({
        'name': '',
        'estado': 0,
        'activa': 0,
        'comensales': 0
    });
    const [open, setOpen] = useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = (id) => {

        getTable(id)
        .then((resultado) => {

            if(resultado !== 'Se ha producido un error al obtener la mesa'){

                setDataTableValues(resultado);
                setOpen(true);
            }
        }).catch((error) => {

            throw new Error(error);
        })
    };
    

    const handleDeleteTable = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡Los cambios no se podrán revertir!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){

                deleteTable(id)
                .then((resultado) =>{

                    if(resultado === 'Mesa eliminada correctamente'){

                        swal("Mesa eliminada Correctamente", {
                            icon: "success",
                        }).then((resultadoConfirmacion) => {

                            if(resultadoConfirmacion){

                                window.location.reload()
                            }
                        }); 
                    }
                }).catch((error) => {

                    throw new Error(error);
                })
            }

        }).catch((error) => {

            throw new Error(error);
        })
        
    }
    const handleDeactivateTable = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡La mesa se desactivará!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){

                deactivateTableSelected(id)
                .then((resultado) =>{
                    
                    if(resultado === 'Mesa desactivada correctamente'){

                        swal("Mesa desactivada Correctamente", {
                            icon: "success",
                        }).then((resultadoConfirmacion) => {

                            if(resultadoConfirmacion){

                                window.location.reload()
                            }
                        }); 
                    }
                }).catch((error) => {

                    console.log(error);
                    throw new Error(error);
                })
            }

        }).catch((error) => {

            throw new Error(error);
        })
    }

    const handleNewEditionData = (e) => {

        setDataTableValues({...dataTableValues,
        
            [e.target.name] : e.target.value
        })
    }

    const handleEditTable = (e) => {

        e.preventDefault();
        editDataTable(dataTableValues)
        .then((resultado) => {

            if(resultado === 'Mesa Actualizada Correctamente'){

                swal("Mesa actualizada Correctamente", {
                    icon: "success",
                }).then((resultadoConfirmacion) => {

                    if(resultadoConfirmacion){

                        window.location.reload()
                    }
                }); 
            }
        }).catch((error) => {

            throw new Error(error);
        })
    }
    return (
        <div className='datatable'>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className='boxTableAdmin'>
                <form onSubmit={handleEditTable}>
                        <div className="form-group">
                            <h4 className="text-center">Datos mesa</h4>
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
                                <input type="text" className="form-control text-center" name="name" value={dataTableValues.name} onChange={handleNewEditionData}/>
                            </div>
                            <div className="col-6 p-3">
                                <select className="form-control text-center" name="estado" value={dataTableValues.estado} onChange={handleNewEditionData}>
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
                                <select className="form-control text-center" name="activa" value={dataTableValues.activa} onChange={handleNewEditionData}>
                                    <option value={0}>Desocupada</option>
                                    <option value={1}>Ocupada</option>
                                </select>
                            </div>
                            <div className="col-6 text-center p-3">
                                <input type="number" className="form-control text-center" name="comensales" value={dataTableValues.comensales} onChange={handleNewEditionData}/>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary ms-3" onClick={handleClose}>Cerrar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <DataGrid
            rows={Rows ? Rows : []}
            columns={columnsTables.concat(actionColunm)}
            pageSize={numRows}
            rowsPerPageOptions={[5]}
            checkboxSelection/>
        </div>
    )
}