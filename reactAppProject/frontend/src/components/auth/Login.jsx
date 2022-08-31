import { useState } from "react"
import loginService from "../../services/loginService";
import login from "../../styles/login.css"
import {Link, useNavigate} from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate('');
    const [userCredentials, setUserCredentials] = useState({

        'email': '',
        'password': ''
    });
    const [wrongCredentials, setWrongCredentials] = useState('');

    const handleChangeCredentials = (e)  => {

        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleUserLogin = async (e) => {

        e.preventDefault();
        try{
            const usuario = await loginService.login(userCredentials);
            usuario.rol ? navigate('/admin') : navigate('/user');
            window.localStorage.setItem('loggedInfoUser', JSON.stringify(usuario));
            console.log(usuario);
        }catch(e){

            setWrongCredentials('Credenciales Erróneas');
            setTimeout( () => {
                setWrongCredentials('');
            }, 5000);
        }
        
    }

    return(
        <div>
            <div className='col-sm-12 d-flex'>
                <div className='col-sm-6'>
                    <img loading='lazy' className='img-fluid' id="imageLoginContainer" src="https://www.revistalimpiezas.es/wp-content/uploads/sites/4/2021/06/interior-restaurante-hosteleria-pandemia-900x600.jpg" alt="imagenLogin"/>
                </div>
                <div className='col-sm-6' id="rightBackGround">
                    <div className='contentLogin'>
                        <h4 className='text-center mb-3'>Bienvenido al TPV de la Copita</h4>
                        <div className='card containerCard'>
                            <div className='card-body'>
                                <form onSubmit={handleUserLogin}>
                                    <div className='form-group mb-3 mt-3'>
                                        <label className='form-label'>Email</label>
                                        <input 
                                        className='form-control loginInputs'
                                        type="email"
                                        value={userCredentials.email}
                                        name="email"
                                        placeholder='Introduzca su email'
                                        onChange={handleChangeCredentials}
                                        />
                                    </div>
                                    <div className='form-group mb-3 mt-3'>
                                        <label className='form-label'>Contraseña</label>
                                        <input 
                                            className='form-control loginInputs'
                                            type="password"
                                            value={userCredentials.password}
                                            name="password"
                                            placeholder='Introduzca su contraseña'
                                            onChange={handleChangeCredentials}
                                            />
                                    </div>
                                    { wrongCredentials ?
                                            <div className="text-center my-2">
                                                <h5 className="text-danger">{wrongCredentials}</h5>
                                            </div>
                                            : null
                                    }
                                    
                                    <div className='text-center mt-2 mb-3'>
                                        <Link to={'/register'}>¿Nuevo Usuario?</Link>
                                    </div>
                                    <div className='text-center'>
                                        <button className='btn btn-primary' id="sendButtonLogin">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}