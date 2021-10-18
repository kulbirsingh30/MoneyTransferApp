import NewTransactionImpl from './newtransaction';
import {connect} from 'react-redux';
import Login from '../login';
// Returns new transaction
function NewTransaction(props){
    if(sessionStorage.getItem('bankingJwt')){
        return <NewTransactionImpl {...props}/>;
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


const ConnectedTransactionPage = connect(mapStateToProps)(NewTransaction)
export default ConnectedTransactionPage;