
import { useState, useEffect } from 'react';
import usuarios from '../../../styles/usuarios.css'
import swal from 'sweetalert'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatatableUsuarios } from '../Dashboard/DatatableUsuarios';
import {Sidebar} from '../Dashboard/Sidebar'
import {Navbar} from '../Dashboard/Navbar'
import { createNewUser, getAllUsers } from '../../../services/usersAdminService';

export const UsersAdmin = () => {

    const [usuarios, setUsuarios] = useState(null);

    useEffect( () => {

        getAllUsers()
            .then(resultado => setUsuarios(resultado))
            .catch((error) => {

                throw new Error(error);
            })
    }, []);

    const [numpages,setPages] = useState(5);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    const [inputsNewUser, setInputsNewUser] = useState({
        'name': '',
        'email': '',
        'password': '',
        'rol': 0
    })

    const handleChange = (e) => {

        setInputsNewUser({
            ...inputsNewUser,
            [e.target.name]: e.target.value
        })

    }

    const handleNewUser = (e) => {
        e.preventDefault();
        createNewUser(inputsNewUser)
        .then((resultado) => {
            if(resultado != null){
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

        <div className='homeUsers'>
            <Sidebar/>
            <div className='containerUsers'>
                <Navbar/>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='boxModalUser'>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Nuevo Usuario
            </Typography>
                <form onSubmit={handleNewUser}>
                <div className='col-sm-12 userRow'>
                        <label className='form-label'>Nombre</label>
                        <input type="text" placeholder='Introduzca el nombre' value={inputsNewUser.name} onChange={handleChange} className="form-control text-center userInputs" name="name" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Email</label>
                        <input type="email" placeholder='Introduzca el email' value={inputsNewUser.email} onChange={handleChange} className="form-control text-center userInputs" name="email" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Password</label>
                        <input type="password" placeholder='Introduzca la contraseña' value={inputsNewUser.password} onChange={handleChange} className="form-control text-center userInputs" name="password" />
                    </div>
                    <div className='col-sm-12 userRow'>
                        <label className='form-label'>Rol</label>
                        <select className='form-control text-center userInputs' name="rol" value={inputsNewUser.rol} onChange={handleChange}>
                            <option value={0}>Camarero</option>
                            <option value={1}>Administrador</option>
                        </select>
                    </div>
                    <div className='col-sm-12 text-center mt-5'>
                        <button className="btn btn-primary" id="sendButtonModalProduct">Crear</button>
                        <button type="button" className='btn btn-secondary ms-2' onClick={handleClose} id="closeButtonModal">Cerrar</button>
                    </div>
                </form>
            </Box>
            </Modal>
                <div className='col-sm-12 d-flex mt-3'>
                    <div className='col-sm-6 d-flex p-4'>
                        <label className='form-label p-1'>Número de Páginas: </label>
                        <select className='form-control ms-3 inputForm text-center' value={numpages} onChange={(e) => {setPages(e.target.value)}}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className='col-sm-6 text-end p-4'>
                        <button type="button" className='btn btn-primary me-3 inputForm' onClick={handleOpen} id="buttonCreateNewUser">Añadir Usuario</button>
                    </div>
                </div>
                <DatatableUsuarios numRows={parseInt(numpages)} Rows={usuarios}/>
            </div>
        </div>
    )
}