import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const handleTypeOfIncrease = (string) => {

    if(string === 'Precio'){

        return ['block', 'none'];

    }else{

        return ['none', 'block'];
    }
}

export const changeIva = (selectorValor, newIva) => {

    return axios.post(`${baseURL}/newIVA`, {selectorValor, newIva}).then(response => response.data);
}

export const changePrices = (selectorValor, newPrices) => {

    return axios.post(`${baseURL}/newPrices`, {selectorValor, newPrices}).then(response => response.data);
}