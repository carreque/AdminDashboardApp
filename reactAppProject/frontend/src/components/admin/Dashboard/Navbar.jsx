import {useNavigate} from 'react-router-dom';
import navbar from '../../../styles/navbar.css'
export const Navbar = () =>{
    const navigate  = useNavigate();

    const  handleLogOut = () => {

        window.localStorage.removeItem('loggedInfoUser');
        navigate('/');
        
    }

    return(
        <div className="headerNavbar">
            <div className="wrapper"> 
                <div className="col-sm-12 text-end p-3">
                    <button className="btn btn-primary" id="logoutButtonAdminSesion" onClick={handleLogOut}>Cerrar Sesión</button>
                </div>
            </div>  
        </div>
    )
}