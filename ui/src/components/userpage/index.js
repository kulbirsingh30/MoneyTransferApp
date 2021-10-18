import Userpage from './userpage';
import {connect} from 'react-redux';
import Login from '../login';
//Returns the userpage
function User(props){
    if(sessionStorage.getItem('bankingJwt')){
        return <Userpage {...props}/>;
    }else{
        window.location.href = '#/login'
        return <Login />
    }
}

function mapStateToProps(state) {
    return { 
        userDetails: state.currentUser
    };
};


const ConnectedUserMainPage = connect(mapStateToProps)(User)
export default ConnectedUserMainPage;