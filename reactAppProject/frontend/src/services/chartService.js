import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getEarnLastSixMonth = () => {

    return axios.get(`${baseURL}/earnLastSixMonth`).then(response => response.data);
}

export const getMesName = (numeroMes) => {

    let mesName = '';
    switch (parseInt(numeroMes)) {
        
        case 1:
            mesName =  'Enero'
            break;
        case 2:
            mesName = 'Febrero';
            break;
        case 3:
            mesName = 'Marzo';
            break;
        case 4:
            mesName = 'Abril';
            break;
        case 5:
            mesName = 'Mayo';
            break;
        case 6:
            mesName = 'Junio';
            break;
        case 7:
            mesName = 'Julio';
            break;
        case 8:
            mesName = 'Agosto';
            break;
        case 9:
            mesName = 'Septiembre';
            break;
        case 10:
            mesName = 'Octubre';
            break;
        case 11:
            mesName = 'Noviembre';
            break;
        case 12:
            mesName = 'Diciembre';
            break;
        default:
            break;
    }

    return mesName;
}

export const datosGrafica = (array1, array2) => {

    if(Array.isArray(array1) && Array.isArray(array2)){

        let arrayDatosGrafica = [];
        array1.map((mes, index) => arrayDatosGrafica.push({name: `${getMesName(mes)}`, total: `${array2[index]}`}))
        return arrayDatosGrafica;
    }
    
    return null;
}