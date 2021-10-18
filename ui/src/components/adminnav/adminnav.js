import { Link } from "react-router-dom";


export default function AdminNavImpl(){
    return(
        
        <div>
        <div className="fixed-top bg-white">
            <ul class="nav nav-pills navbar-left">
            <li role="presentation"><Link to = "/v1/admin"><h4 className="navbar-brand">Bank of KARS</h4></Link></li>
            </ul>
            <ul class="nav nav-pills navbar-right">
            <li role="presentation"><Link to = "/" onClick={()=>{
                alert("Logout Successfully");
                sessionStorage.removeItem("bankingJwt");
            
            }}><h4>Logout</h4></Link></li>
            </ul>
        </div>
        {/* <nav className="fixed-top fixed-top-2 navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav nav-bar navbar-left">
                <li className="nav-item active">
                    <Link to = "/admin" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to = "/approveuser" className="nav-link">Approve User</Link>                            
                </li>
                <li className="nav-item">
                    <Link to = "/viewuser" className="nav-link">View User</Link>
                </li>
                <li className="nav-item">
                    <Link to = "/approvecard" className="nav-link">Approve User Card</Link>
                </li>
                </ul>
            </div>
        </nav>    */}
        </div>
    )
}