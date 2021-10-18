import axios from 'axios';

//API urls
const API_URL = '/rest/v1/users'

//api calls 
const signUp = (user) => {
    return axios.post(API_URL, user);
}

export default {
    signUp
}