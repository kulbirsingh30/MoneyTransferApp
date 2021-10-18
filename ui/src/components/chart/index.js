import UserCharts from './chart';
import {connect} from 'react-redux';
import Login from '../login'
//Returns chart  

function Charts(props){
    if(sessionStorage.getItem('bankingJwt')){
        return <UserCharts {...props}/>;
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


const ConnectedChartPage = connect(mapStateToProps)(Charts)
export default ConnectedChartPage;