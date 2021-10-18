import produce from 'immer';
import _ from 'lodash';

//defining state
const initialState = () => {
    return {
        loginReducer: {
            email: '',
            password: '',
            isAuthenticated: false
        },
        adminLoginReducer:{
          email:'',
          password:'',
          isAuthenticated:false
        },
        resetReducer:{
          email: ''
        },
        findEmailReducer:{
          email:''
        },
        signUpReducer: {
          fullName:'',
          address:'', 
          city:'', 
          state:'', 
          zipcode:'',
          ssn:'',
          dob:'',
          email:'',
          typeOfIdentification:'',
          identificationIssuerState:'',
          identificationNumber:'',
          identificationExpiryDate:'',
          password: ''
        },
        notifications: [],
        admin: {
          userList: [],
          selectedUserDetails: {}     
        },
        currentUser:{}
    }
    
  };
  //defining reducers and dispatch
  const rootReducer = produce((draft = initialState(), action) => {
      switch(action.type) {
          case 'CHANGE_LOGIN_EMAIL':
          draft.loginReducer.email = action.payload;
          break;

          case 'CHANGE_EMAIL':
          draft.resetReducer.email=action.payload;
          break;

          case 'CHANGE_USER_EMAIL':
          draft.findEmailReducer.email=action.payload;
          break;
          case 'CHANGE_ADMIN_EMAIL':
            draft.adminLoginReducer.email = action.payload;
            break;
          case 'CHANGE_ADMIN_PASSWORD':
            draft.adminLoginReducer.password = action.payload;
            break;
          case 'CHANGE_LOGIN_PASSWORD':
            draft.loginReducer.password = action.payload;
            break;
          case 'SET_AUTHENTICATED':
            draft.loginReducer.isAuthenticated = action.isAuthenticated;
            draft.loginReducer.jwtToken = action.jwtToken;
            draft.loginReducer.email = '';
            draft.loginReducer.password = '';
            break;
          case 'SET_ADMIN_AUTHENTICATED':
            draft.adminLoginReducer.isAuthenticated = action.isAuthenticated;
            draft.adminLoginReducer.jwtToken = action.jwtToken;
            draft.adminLoginReducer.email = '';
            draft.adminLoginReducer.password = '';
            break;
          case 'CHANGE_SIGNUP_FORM_INPUT':
            draft.signUpReducer[action.fieldName] = action.fieldValue;
            break;
            
      
          case 'ADD_NOTIFICATION':
            draft.notifications.push(action.value);
            break;

          case 'REMOVE_NOTIFICATION': 
            draft.notifications = _.reject(draft.notifications, {id : action.id});
            break;
          case 'SET_USER_LIST': 
            draft.admin.userList = action.userList;
            break;
          case 'SET_ADMIN_SELECTED_USER': 
            draft.admin.selectedUserDetails = action.selectedUser;
            break;
          case 'SET_CURRENT_USER': 
            draft.currentUser = action.payload;
            break;
          default:
            return draft;
      }
  })
  
  export default rootReducer;