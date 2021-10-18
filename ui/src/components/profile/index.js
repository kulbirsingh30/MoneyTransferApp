import Profile from './profile';
import {connect} from 'react-redux';
import Login from '../login';
// Returns user profile
function UserProfile(props){
    
    if(sessionStorage.getItem('bankingJwt')){
        return <Profile {...props}/>
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


const ConnectedUserPage = connect(mapStateToProps)(UserProfile)
export default ConnectedUserPage;
