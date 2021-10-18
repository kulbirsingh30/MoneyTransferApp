import './signUpForm.scss';
import SignUpForm from "./signUpForm";
import { connect } from "react-redux";
import { signUp, signUpForInputChange } from "../../store/actions";

// Returns signup page
function Signup(props) {
    return (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 signup-page">
                <SignUpForm {...props} />
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

function mapStateToProps(state) {

    return { 
        fullName: state.signUpReducer.fullName,
        address: state.signUpReducer.address, 
        city: state.signUpReducer.city, 
        state: state.signUpReducer.state, 
        zipcode: state.signUpReducer.zipcode,
        ssn: state.signUpReducer.ssn,
        dob: state.signUpReducer.dob,
        email: state.signUpReducer.email,
        typeOfIdentification: state.signUpReducer.typeOfIdentification,
        identificationIssuerState: state.signUpReducer.identificationIssuerState,
        identificationNumber: state.signUpReducer.identificationNumber,
        identificationExpiryDate: state.signUpReducer.identificationExpiryDate,
        password: state.signUpReducer.password
        
    };
};
const mapDispatchToProps = {
        signUpForInputChange: signUpForInputChange,
        onSubmit: signUp
}

const ConnectedSignUpPage = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default ConnectedSignUpPage;