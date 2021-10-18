import loginApi from './loginApi';
import signUpApi from './signUpApi';
import userApi from './userApi';

// Dispatiching actions and payload for setting state
export function changeLoginEmail(payload) {
    return { type: 'CHANGE_LOGIN_EMAIL', payload }
};

export function changeLoginPassword(payload) {
    return { type: 'CHANGE_LOGIN_PASSWORD', payload }
};

export function changeEmail(payload) {
    return { type: 'CHANGE_EMAIL', payload }
};

export function changeUserEmail (payload) {
    return{type: 'CHANGE_USER_EMAIL',payload}
}
export function changeAdminEmail (payload) {
    return{type: 'CHANGE_ADMIN_EMAIL',payload}
}
export function changeAdminPassword (payload){
    return{type: 'CHANGE_ADMIN_PASSWORD',payload}
}

export function setUserList () {
    return async (dispatch) => {
        const userList = await userApi.getAll();
        dispatch({
            type: 'SET_USER_LIST',
            userList:userList.data
        })
    }
}

export function setSelectedUserDetails(selectedUser) {
    return {
        type: 'SET_ADMIN_SELECTED_USER',
        selectedUser
    }
}

export function deleteUserAction(userId) {
    return async function(dispatch) {
        await userApi.deleteUser(userId);
        dispatch(setUserList());
    }
}

//user password reset api
export function reset(email){
    return async function(dispatch){  
       loginApi.reset(email)
       .then((res)=>{
        const {isEmailSent, message} =res.data;
        dispatch(
            addNotification({
                type: isEmailSent ? 'success' : 'error',
                message: message
            })           
        );
       }).catch((err)=>{
        dispatch(addNotification({
            type: 'error',
            message: err.response.statusText
        }));

       })

        
    }

}

//user login api
//setting jwt token on success

export function login(payload) {
    return async function(dispatch) {
        loginApi.login(payload).then((res) => {
            const { isAuthenticated, jwtToken, userDetails } = res.data;
            // dispatch actions
            dispatch({type: 'SET_AUTHENTICATED', isAuthenticated, jwtToken})
            dispatch({type: 'SET_CURRENT_USER', payload:userDetails})
            //storing token in sessionstorage
            sessionStorage.bankingJwt = jwtToken;
            sessionStorage.email = userDetails.email;
            sessionStorage.fullName = userDetails.fullName;
            sessionStorage.verifyByAdmin = userDetails.verifyByAdmin;
            sessionStorage.userDetails = userDetails;
            //on success
            if(isAuthenticated){alert("Login Successful")}

            window.location.href='/#/user'

        }).catch((err) => {
            alert("Incorrect user details")
        })
    }
};

// admin login
export function adminLogin(payload){
    return async function(dispatch){
        loginApi.adminLogin(payload).then((res)=>{
            const { isAuthenticated, jwtToken} = res.data;
            //dispatch admin token
            dispatch({type:'SET_ADMIN_AUTHENTICATED', isAuthenticated, jwtToken})
            //storing jwt in session storage
            sessionStorage.bankingJwt = jwtToken;
            //on login success
            if(isAuthenticated){alert("Login Successful")}
            window.location.href='/#/admin'
        }).catch((e)=>{
            alert('Incorrect Login Details');
            console.error(e)
        })
    }
}

//signup
export function signUp(payload) {

    return (dispatch) => {
        //dispatch on success signup
        signUpApi.signUp(payload).then((res) => {
            dispatch(addNotification({
                type: 'success',
                message: 'User registered successfully'
            }));
        }).catch((err) => {
            //dispatch error on fail
            dispatch(addNotification({
                type: 'error',
                message: `Failed to register user: ${err.response.statusText}`
            }));
        })

    }
};


export function signUpForInputChange(fieldName, fieldValue) {
    return { type: 'CHANGE_SIGNUP_FORM_INPUT', fieldName, fieldValue}
}

export function addNotification(value) {
    return (dispatch, getState) => {
        const { notifications } = getState();
        const id = `notif-id-${notifications.length}`;
        value.id = id;
        dispatch({ type: 'ADD_NOTIFICATION', value})
    }
}

export function removeNotification(id) {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', id})
    }
}
