import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAllBills = () =>{

    return axios.get(`${baseURL}/allBills`).then(response => response.data);
}

export const getInfoBill = (id) => {

    return axios.get(`${baseURL}/getOrderFromOneBill`, {
        params: {

            'id': id
        }
    }).then(response => response.data);
}

export const formatInfoOrder = (comanda) => {

    if(!Array.isArray(comanda)) return [];
    const keys = Object.keys(comanda[0]);
    let precios = [];
    let ivas = [];
    let quantity = [];
    let ids = [];

    keys.map((key) => {
        
        quantity.push(comanda[0][key]);
        precios.push(comanda[1][key]);
        ivas.push(comanda[2][key]);
        ids.push(comanda[3][key]);
    })

    return [keys, quantity, precios, ivas, ids];
}

export const incrementProduct = (id, idBill) => {

    return axios.put(`${baseURL}/incrementProduct`,{
        'id': id,
        'factura': idBill
    }).then(response => response.data);
}

export const decrementProduct = (id, idBill) => {

    return axios.put(`${baseURL}/decrementProduct`, {

        'id': id,
        'factura': idBill
    }).then(response => response.data);
}

export const filterOrders = (filterValues) => {

    return axios.get(`${baseURL}/filteredOrders`, {params: filterValues}).then(response => response.data);
}