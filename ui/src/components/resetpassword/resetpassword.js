
import { Link, Redirect } from "react-router-dom";
import NavbarMain from "../navbar";

// This action calls the API
   function ResetPassword(props){
		const {email,changeEmail,reset} =props;
		const handleInputChange = (event) => {
			if(event.target.name === 'email') {
				changeEmail(event.target.value);
			}
		}
		const onReset =() =>{
			reset(email);
		}


    return(
		<div>
			<NavbarMain />
			<div className="container padding-bottom-3x mb-2 mt-5">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-10">
						<div className="forgot">
							<h2>Forgot your password?</h2>
							<p>Change your password in three easy steps. This will help you to secure your password!</p>
							<ol>
								<li><span className="text-primary text-medium"></span>Enter your email address below.</li>
	                    		<li><span className="text-primary text-medium"></span>Our system will send password to the entered email</li>
	                    		<li><span className="text-primary text-medium"></span>The sent password then can be used to login the page </li>
	                		</ol>

						</div>
						<div className="card-body">
							<div className="form-group"> <label>Enter your email address</label> <input onChange={handleInputChange} className="form-control" type="email" name="email" id="email-for-pass"  value={email}  required/><small className="form-text text-muted">Enter the email address you used during the registration.</small> </div>
						</div>
			

						<div className="card-footer"><Link to='/login'> <button className="btn btn-success"  onClick={onReset}>Get New Password</button></Link> <Link to='/login'><button className="btn btn-danger">Back to Login</button></Link> </div>
					</div>
				</div>
			</div>
		</div>

    )
} 
 export default ResetPassword
