import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL;

const login = async credentials => {
    console.log(baseURL);
    const {data} = await axios.post(`${baseURL}/auth/login`, credentials);
    return data;
}

export default { login }