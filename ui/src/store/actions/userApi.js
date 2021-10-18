import axios from 'axios';

//api
const USER_URL = '/rest/v1/users';

//api calls
const getAll = () => {
    return axios.get(USER_URL,);
}

const deleteUser = (id) => {
    return axios.delete(`${USER_URL}/${id}`);
}

export default {
    getAll, deleteUser
}