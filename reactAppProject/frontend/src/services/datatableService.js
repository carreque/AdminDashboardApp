import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const columnsProducts = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 130,
        renderCell: (params) => {
            return (
                <div>
                    <div className='cellWithImg'>
                        <img loading='lazy' className="cellImg" src={params.row.image || 'https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg'} alt="imagenDefecto" />
                        <div>{params.row.name}</div>
                    </div>
                </div>
            )
        }
    },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    {
        field: 'precio_racion',
        headerName: 'Precio_ración',
        width: 130,
    },
    {
        field: 'precio_bebida',
        headerName: 'Precio_bebida',
        width: 130,
    },
    {
        field: 'IVA',
        headerName: 'IVA',
        width: 130,
    },
    {
        field: 'Cocina',
        headerName: 'Cocina',
        width: 130,
        renderCell: (params) => {

            return (
                <div className={params.row.Cocina === 0 ? 'cellWithStatus negative' : 'cellWithStatus positive'}>
                    {params.row.Cocina === 1 ? 'Si' : 'No'}
                </div>
            )
        }
    },
    {
        field: 'Activado',
        headerName: 'Activado',
        width: 130,
        renderCell: (params) => {

            return (
                <div className={params.row.Activado === 0 ? 'cellWithStatus negative' : 'cellWithStatus positive'}>
                    {params.row.Activado === 1 ? 'Activado' : 'Desactivado'}
                </div>
            )
        }
    },

];

//Productos
export const getProductInformation = (id) => {

    return axios.get(`${baseURL}/getAProduct`, {
        params: {
            'id': id
        }
    }).then(response => response.data);
}

export const editProduct = (values) => {

    return axios.post(`${baseURL}/editProduct`, values).then(response => response.data);
}

export const deleteProduct = (id) => {

    return axios.post(`${baseURL}/deleteProduct`, {id}).then(response => response.data);
}

export const hiddeProduct = (id) => {
    
    return axios.post(`${baseURL}/deactivateProduct`,{id}).then(response => response.data);
}

//Usuarios
export const columnsUsers = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 300,
        renderCell: (params) => {
            return (
                <div>
                    <div className='cellWithImg'>
                        <img loading='lazy' className="cellImg" src={params.row.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'} alt="imagenDefecto" />
                        <div>{params.row.name}</div>
                    </div>
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 300 },
    {
        field: 'rol',
        headerName: 'Rol',
        width: 200,
        renderCell: (params) => {

            return (
                <div>
                    {params.row.rol ? 'admin' : 'camarero'}
                </div>
            )
        }
    },
];

export const editAUser = (values) => {

    return axios.post(`${baseURL}/editUser`,values).then(result => result.data);
}

export const deleteUser = (id) => {

    return axios.post(`${baseURL}/deleteUser`, {id}).then(resultado => resultado.data);
}


