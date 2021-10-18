import './loginForm.scss';
import LoginForm from "./loginForm";
import { connect } from "react-redux";
import { changeLoginEmail, changeLoginPassword, login } from "../../store/actions";

//Returns login page
function Login(props) {
    return (
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 login-page">
                <LoginForm {...props}/>
            </div>
            <div className="col-md-4"></div>
        </div>
    )
    
}

function mapStateToProps(state) {

    return { 
        email: state.loginReducer.email,
        password: state.loginReducer.password
    };
};
const mapDispatchToProps = { changeLoginEmail, changeLoginPassword, login };
const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLoginPage;