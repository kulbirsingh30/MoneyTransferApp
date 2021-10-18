import axios from 'axios';
import rootReducer from '../reducers'

//api url
const API_URL = '/rest/v1/log/in'
const API_URL_ADMIN = '/rest/v1/log/in/admin'
const API_URL_RESET='/rest/v1/log/in/reset/?email='
const USER_URL = '/rest/v1/users';


// api calls in axios
const login = (creds) => {
    return axios.post(API_URL, creds);
}

const adminLogin = (creds) => {
    return axios.post(API_URL_ADMIN,creds);
}

const reset =async (email) =>{
    
    const url= API_URL_RESET + email
    console.log(url);
    return await axios.get(url);
}

export default {
    login:login,
    adminLogin:adminLogin,
    reset :reset
}