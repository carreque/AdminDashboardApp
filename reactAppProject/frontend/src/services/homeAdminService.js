
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getCategories = () => {

   return axios.get(`${baseURL}/categories`).then(response => response.data);
}

export const getUsers = () => {

    return axios.get(`${baseURL}/allUsers`).then(response => response.data);
}

export const getMeanPrice = () => {

    return axios.get(`${baseURL}/meanPrice`).then(response => response.data);
}