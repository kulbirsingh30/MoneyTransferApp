import { Link } from "react-router-dom";
import "./adminlogin.scss";
import NavbarMain from '../navbar'

// admin panel
function AdminLoginImpl(props) {
    const {email, password, changeAdminEmail, changeAdminPassword, adminLogin } = props
    
    const handleInputChange = (event) => {
        if(event.target.name === 'email') {
            changeAdminEmail(event.target.value);
        }
        if(event.target.name === 'password') {
            changeAdminPassword(event.target.value);
        }
    }

    const onLogIn = () => {
        adminLogin({email,password})
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
                    
                </div>
            </div>
     
        </div>
    )

}

export default AdminLoginImpl