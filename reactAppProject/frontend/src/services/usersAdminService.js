import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;


export const getAllUsers = () => {

    return axios.get(`${baseURL}/allUsers`).then(resultado => resultado.data);
}
export const createNewUser = (values) => {

    return axios.post(`${baseURL}/newUser`, values).then(response => response.data);
}