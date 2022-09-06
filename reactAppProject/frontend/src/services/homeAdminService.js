
import axios from "axios";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getCategories = () => {

   return axios.get(`${baseURL}/categories`).then(response => response.data);
}

export const getLastOrders = () => {

    return axios.get(`${baseURL}/lastOrders`).then(response => response.data);
}
export const getUsers = () => {

    return axios.get(`${baseURL}/allUsers`).then(response => response.data);
}

export const getMeanPrice = () => {

    return axios.get(`${baseURL}/meanPrice`).then(response => response.data);
}

export const getDiaryBills = () => {

    return axios.get(`${baseURL}/todayBills`).then(response => response.data);
}

export const widgetFill = (type) => {

    let data = 0; 
    
    switch(type) {

        case "user":
            return data = {
                title: "USERS",
                isMoney: false,
                link: "Ver todos los usuarios",
                icon: (
                    <PersonOutlinedIcon className='iconWidget' />
                )
            };
            break;

        case "products":
            return data = {
                title: "Categorias",
                isMoney: false,
                link: "Ver todas las categorias",
                icon: (
                    <ProductionQuantityLimitsIcon className='iconWidget' />
                )
            };
            break;
        case "Precios":
           return data = {
                title: "Precios",
                isMoney: true,
                link: "Ver los precios actuales",
                icon: (
                    <EuroIcon className='iconWidget' />
                )
            };
            break;

        case "ventasDiarias":
            return data = {
                title: "Ventas Diarias",
                isMoney: false,
                link: "Ver las ventas de hoy",
                icon: (
                    <MonetizationOnIcon className='iconWidget'/>
                )
            }
            break;
            
        default:
            break;
    }
}