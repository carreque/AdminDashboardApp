import sidebar from '../../../styles/sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import EuroIcon from '@mui/icons-material/Euro';
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo">La Copita</span>
            </div>
            <hr/>
            <div className="center">
                <ul className="listOptions">
                    <p className="title">Principal</p>
                    <li className="itemColumn">
                        <DashboardIcon className="icon"/>
                        <Link to={'/admin'}><span className="spanContent">Inicio</span></Link>
                    </li>
                    <p className="title">Manejo de Productos y Categorías</p>
                    <li className="itemColumn">
                        <ProductionQuantityLimitsIcon className="icon"/>
                        <Link to='/admin/Productos'><span className="spanContent">Productos y Categorías</span></Link>
                    </li>
                    <p className="title">Manejo de Precios</p>
                    <li className="itemColumn">
                        <EuroIcon className="icon"/>
                        <Link to={'/admin/precios'}><span className="spanContent">Modificar Precios</span></Link>
                    </li>
                    <p className="title">Manejo de Usuarios</p>
                    <li className="itemColumn">
                        <GroupIcon className="icon"/>
                        <Link to={'/admin/Usuarios'}><span className="spanContent">Usuarios</span></Link>
                    </li>
                </ul>
            </div>
        </div>
  )
}