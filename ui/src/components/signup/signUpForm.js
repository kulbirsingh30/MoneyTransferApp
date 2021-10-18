import { Link } from "react-router-dom";
import NavbarMain from '../navbar'

function SignUpForm(props) {

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        props.signUpForInputChange(fieldName, fieldValue)
       
    }

    const handleOnSubmit = () => {
        const { 
            address,
            city,
            dob,
            email,
            fullName,
            // identificationExpiryDate,
            identificationIssuerState,
            identificationNumber,
            ssn,
            state,
            typeOfIdentification,
            zipcode,
            password
         } = props;

      

        const user = {
            address,
            city,
            dob,
            email,
            fullName,
            // identificationExpiryDate,
            identificationIssuerState,
            identificationNumber,
            ssn,
            state,
            typeOfIdentification,
            zipcode
        };
       

        const creds = {
            password
        }

        const userInfo = {
            user,
            creds
        }
       
        props.onSubmit(userInfo);
        alert("Sign up success")
    }

    return (
        <div>
            <NavbarMain/>
            <div className="container">
                <div className="panel-heading"><h1>Register</h1></div>
                <div className="panel-body">
                    <div className="custom-well">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Full Name</label>
                            <input type="text" name="fullName" className="form-control" onChange={handleInputChange} placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input type="text" name="address" className="form-control" onChange={handleInputChange} placeholder="123 Saul St"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">City</label>
                            <input type="text" name="city" className="form-control" onChange={handleInputChange} placeholder="Boston" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">State</label>
                            <input type="text" name="state" className="form-control" onChange={handleInputChange} placeholder="MA" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Zip Code</label>
                            <input type="text" name="zipcode" className="form-control" onChange={handleInputChange} placeholder="54769" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">SSN</label>
                            <input type="text" name="ssn" className="form-control" onChange={handleInputChange} placeholder="345-12-9888" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">DOB</label>
                            <input type="date" name="dob" className="form-control" onChange={handleInputChange} placeholder="02-09-2020" />
                        </div>
                    </div>
                    <div className="custom-well">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Type of Identification</label>
                            <input type="text" name="typeOfIdentification" className="form-control" onChange={handleInputChange} placeholder="PAN CARD" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Identification Issuer State</label>
                            <input type="text" name="identificationIssuerState" className="form-control" onChange={handleInputChange} placeholder="MA" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Identification Number</label>
                            <input type="text" name="identificationNumber" className="form-control" onChange={handleInputChange} placeholder="123567" />
                        </div>
                    </div>
                    <div className="custom-well">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email Address</label>
                            <input type="email" name="email" className="form-control" onChange={handleInputChange} placeholder="sa@roh.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleInputChange} placeholder="****" />
                        </div>
                    </div>
                    <Link to="/login">
                    <button type="submit" onClick={handleOnSubmit} className="btn btn-primary">
                        
                            Register
                        
                    </button>
                    </Link>
                    <div>Already a member? <Link to='/login'>Log in</Link></div>
                </div>
            </div>
          
        </div>
    )

}

export default SignUpForm