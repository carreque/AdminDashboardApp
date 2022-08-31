import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAllProducts = () => {

    return axios.get(`${baseURL}/getAllProducts`).then(response => response.data);
}

export const getProductsOfACategory = (id) => {

    return axios.get(`${baseURL}/getProductsCertainType`, {
        params: {

            'id': id
        }
    }).then(response => response.data);
}

export const createProduct = (values) => {

    return axios.post(`${baseURL}/newProduct`, values).then(response => response.data);
}

export const createCategory = (name) => {

    return axios.post(`${baseURL}/newCategory`, {name}).then(response => response.data);
}

export const deleteCategory = (id) => {

    return axios.post(`${baseURL}/deleteCategory`, {id}).then(response => response.data);
}

export const openSettings = (string) => {

    if (string === 'Categoria') {

        return ['none', 'block', 'none', '200px'];

    } else if (string === 'Producto') {
   
        return ['block', 'none', 'none', '710px'];

    } else if (string === 'BorrarCategoria') {

        
        return ['none', 'none', 'block', '200px'];
    }

    
}