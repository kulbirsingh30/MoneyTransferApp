import NewCardRegistration from './newCardRegistration';
import Login from '../login';
import {connect} from 'react-redux';

//card functionality
function NewCard(props){
    if(sessionStorage.getItem('bankingJwt')){
        return <NewCardRegistration {...props}/>;
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


const ConnectedCardPage = connect(mapStateToProps)(NewCard)
export default ConnectedCardPage;