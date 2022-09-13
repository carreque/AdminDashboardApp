import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL; 

export const getConsumptionOfAProductWeekly = (id) => {

    return axios.get(`${baseURL}/productConsumptionWeekly`, {
        params:{

            'id': id
        }
    }).then(result => result.data);
}

export const getConsumptionOfAProductMonthly = (id) => {

    return axios.get(`${baseURL}/productConsumptionMonthly`, {
        params: {

            'id': id
        }
    }).then(result => result.data);
}

export const getCategoryConsumptionWeekly = (id) => {

    return axios.get(`${baseURL}/getCategoryConsumptionsWeekly`, {
        params: {

            'id': id
        }
    }).then(result => result.data);
}

export const getCategoryConsumptionMonthly = (id) => {

    return axios.get(`${baseURL}/getCategoryConsumptionsMonthly`,{

        params: {

            'id': id
        }
    }).then(result => result.data);
}
