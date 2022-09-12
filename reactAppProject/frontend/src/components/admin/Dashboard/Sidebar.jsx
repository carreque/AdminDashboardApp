import sidebar from '../../../styles/sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';

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
                        <Link to={'/admin'} className='linkSideBar'><span className="spanContent">Inicio</span></Link>
                    </li>
                    <p className="title">Manejo de Productos y Categorías</p>
                    <li className="itemColumn">
                        <ProductionQuantityLimitsIcon className="icon"/>
                        <Link to='/admin/Productos' className='linkSideBar'><span className="spanContent">Productos y Categorías</span></Link>
                    </li>
                    <p className="title">Manejo de Precios</p>
                    <li className="itemColumn">
                        <EuroIcon className="icon"/>
                        <Link to={'/admin/precios'} className='linkSideBar'><span className="spanContent">Modificar Precios</span></Link>
                    </li>
                    <li className="itemColumn mt-3">
                        <MonetizationOnIcon className="icon"/>
                        <Link to={'/admin/bills'} className='linkSideBar'><span className="spanContent">Facturas</span></Link>
                    </li>
                    <p className="title">Manejo de Usuarios</p>
                    <li className="itemColumn">
                        <GroupIcon className="icon"/>
                        <Link to={'/admin/Usuarios'} className='linkSideBar'><span className="spanContent">Usuarios</span></Link>
                    </li>
                    <p className="title">Informes</p>
                    <li className="itemCok">
                        <AssessmentIcon className='icon'/>
                        <Link to={'/admin/reports'} className='linkSideBar'><span className="spanContent">Informes</span></Link>
                    </li>
                </ul>
            </div>
        </div>
  )
}