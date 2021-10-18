import { Link } from "react-router-dom";
import "./usernav.scss";
//usernav
export default function  UserNav(verifyByAdmin) {
    
    return(
    <div>  
        <div className="usernav">
            <div className="profile">
                <strong><Link to = "/user" className="nav-link ml-5 heading"><h1>EasyMoney</h1></Link></strong>
            </div>
            {
                verifyByAdmin?
                    <nav className="sidebar">
                    <ul className="list-unstyled components">
                        <li className="active marList">
                            <strong><Link to = "/user" className="nav-link text-light linkStyle mt-3 mb-3">Dashboard</Link></strong>
                        </li>
                        <li className="active marList">
                            <strong><Link to = "/transactions" className="nav-link text-light linkStyle mt-3 mb-3">Transactions</Link></strong>
                        </li>
                        <li className="active marList">
                            <strong><Link to = "/newtxn" className="nav-link text-light linkStyle mt-3 mb-3">New Transaction</Link></strong>
                        </li>
                        <li className="active marList">
                            <strong><Link to = "/newcard" className="nav-link text-light linkStyle mt-3 mb-3">Add Payment Method</Link></strong>
                        </li>
                    </ul>
                    </nav>
                :null
            }

        </div>
        <div>
            <ul className="rightNav">
                <li className="active marList">
                    <Link to = "/profile" className="nav-link text-dark mt-3 mb-3">Profile</Link>
                </li>
                <li className="active marList">
                    <Link to = "/" className="nav-link text-dark mt-3 mb-3 mr-4" onClick={()=>{
                        sessionStorage.removeItem('bankingJwt');
                        sessionStorage.removeItem('userData');
                        
                        }}><i class="fas fa-power-off"></i>
                    </Link>
                </li>    
            </ul>
        </div>
    </div>
    )
}

