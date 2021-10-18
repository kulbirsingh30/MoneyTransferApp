import { Link } from "react-router-dom";
import "./adminnav.scss";

//admin navigation page
export default function  AdminNav() {
    
    return(
    <div>  
        <div className="adminnav">
            <div className="adminprofile">
                <Link to = "/admin" className="nav-link ml-5 adminheading"><h1>EasyMoney Admin</h1></Link>
            </div>
        </div>
        <div>
            <ul className="adminrightNav">
                <li className="active adminmarList">
                    <Link to = "/" className="nav-link text-dark mt-3 mb-3 mr-4" onClick={()=>{sessionStorage.removeItem('bankingJwt')}}><i class="fas fa-power-off"></i></Link>
                </li>    
            </ul>
        </div>
    </div>
    )
}