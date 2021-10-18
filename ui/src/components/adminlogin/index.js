import AdminLoginImpl from './adminlogin';
import { connect } from "react-redux";
import { changeAdminEmail, changeAdminPassword, adminLogin } from "../../store/actions";

function AdminLogin(props){

    return(
        <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 login-page">
            <AdminLoginImpl {...props}/>
        </div>
        <div className="col-md-4"></div>
        </div>
    ) 
}

function mapStateToProps(state) {
    return { 
        email: state.adminLoginReducer.email,
        password: state.adminLoginReducer.password
    };
};

const mapDispatchToProps = { changeAdminEmail, changeAdminPassword, adminLogin };
//connecting props to component
const connectAdminLogin = connect(mapStateToProps,mapDispatchToProps)(AdminLogin);

export default connectAdminLogin;