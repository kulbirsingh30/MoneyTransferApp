import './resetPassword.scss'
import ResetPassword from "./resetpassword";
import { connect } from "react-redux";
import { changeEmail,reset} from "../../store/actions";

// It resets the password
function ResetPasswordMain(props){
    return (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 reset-page">
                <ResetPassword {...props}/>
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

function mapStateToProps(state) {

    return { 
        email: state.resetReducer.email
    };
};

const mapDispatchToProps = { changeEmail, reset };
const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordMain)
export default ConnectedLoginPage;