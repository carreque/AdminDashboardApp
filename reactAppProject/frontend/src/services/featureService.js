import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getEarnToday = () => {

    return axios.get(`${baseURL}/earnToday`).then(response => response.data);
}

