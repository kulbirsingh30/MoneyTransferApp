import UserTransaction from './transactions';
import {connect} from 'react-redux';
import Login from '../login';
// Returns transaction page
function Transactions(props){
    if(sessionStorage.getItem('bankingJwt')){
        return <UserTransaction {...props}/>;
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


const ConnectedTransactionPage = connect(mapStateToProps)(Transactions)
export default ConnectedTransactionPage;