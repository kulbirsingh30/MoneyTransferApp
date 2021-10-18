import { Link } from "react-router-dom";

import NavbarMain from '../navbar'

//Login
function LoginForm(props) {
    const {email, password, changeLoginEmail, changeLoginPassword, login } = props
    
    const handleInputChange = (event) => {
        if(event.target.name === 'email') {
            changeLoginEmail(event.target.value);
        }
        if(event.target.name === 'password') {
            changeLoginPassword(event.target.value);
        }
    }

    const onLogIn = () => {
        login({email,password})
    }

    return (
        <div>
            <NavbarMain/>
            <div className="container">
                <div className="panel-heading"><h1>Login</h1></div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={handleInputChange} value={email} placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleInputChange} value={password} placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-success" onClick={onLogIn}>Log in</button>
                    <div>Not a user yet? <Link to='/signup'>Sign up</Link> Forgot Password? <Link to='/forgotpass'>Forgot</Link></div>
                    
                </div>
            </div>
     
        </div>
    )

}

export default LoginForm