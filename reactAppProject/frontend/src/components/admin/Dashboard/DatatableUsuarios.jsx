import datatable from '../../../styles/datatable.css';
import { DataGrid } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { columnsUsers, deleteUser, editAUser } from '../../../services/datatableService';

export const DatatableUsuarios = ({ numRows, Rows }) => {

    const actionColunm = [{
        field: 'action', headerName: 'Acciones', width: 200, renderCell: (params) => {
            return (
                <div className='cellAction d-flex text-center'>
                    <div className='editButton'><a href="#" onClick={(e) => { e.preventDefault(); handleOpen(params.row.id) }}><CreateIcon /></a></div>
                    <div className='DeleteButton ms-3'><a href="#" onClick={(e) => { e.preventDefault(); deleteUserHandling(params.row.id) }}><DeleteIcon /></a></div>
                </div>
            )
        }
    }]

    const [open, setOpen] = useState(false);
    const [inputModalValues, setInputModalValues] = useState({
        'id': 0,
        'name': '',
        'email': '',
        'password': '',
        'rol': 0,
    });
    const handleOpen = (id) => {

        let usuario = Rows.find(element => element.id === id);
        setInputModalValues({
            'id': usuario.id,
            'name': usuario.name,
            'email': usuario.email,
            'rol': usuario.rol
        });
        setOpen(true);
    }

    const handleChange = (e) => {
        setInputModalValues({
            ...inputModalValues,
            [e.target.name]: e.target.value
        })
    }
    const editUser = (e) => {
        e.preventDefault();
        editAUser(inputModalValues)
            .then((resultado) => {
                
                if(resultado){

                    setOpen(false);
                    window.location.reload();
                }
            }).catch((error) => {

                throw new Error(error);
            })
    }
    const handleClose = () => { setOpen(false) };
    const deleteUserHandling = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡Los cambios no se podrán revertir!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){
                // console.log(id);
                deleteUser(id)
                .then((resultado) => {
                if(resultado){
                        swal("Eliminado Correctamente", {
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
        })
    }

    return (<div className='datatable'>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box id="userDatatables">
                <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                    Datos del usuario
                </Typography>
                <form onSubmit={editUser}>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Nombre</label>
                        <input type="text" placeholder='Introduzca el nombre' value={inputModalValues.name} onChange={handleChange} className="form-control text-center userInputs" name="name" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Email</label>
                        <input type="email" placeholder='Introduzca el email' value={inputModalValues.email} onChange={handleChange} className="form-control text-center userInputs" name="email" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Password</label>
                        <input type="password" placeholder='Introduzca la contraseña' value={inputModalValues.password} onChange={handleChange} className="form-control text-center userInputs" name="password" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Rol</label>
                        <select className='form-control text-center userInputs' name="rol" value={inputModalValues.rol} onChange={handleChange}>
                            <option value={0}>Camarero</option>
                            <option value={1}>Administrador</option>
                        </select>
                    </div>
                    <div className='col-sm-12 text-center mt-5'>
                        <button className="btn btn-primary" id="sendButtonModalProduct">Editar</button>
                        <button type="button" className='btn btn-secondary ms-2' onClick={handleClose} id="closeButtonModal">Cerrar</button>
                    </div>
                </form>
            </Box>
        </Modal>
        <DataGrid
            rows={Rows ? Rows : []}
            columns={columnsUsers.concat(actionColunm)}
            pageSize={numRows}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    </div>
    )
}