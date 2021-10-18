import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <div className="fixed-top bg-white">  
            <ul class="nav nav-pills navbar-left">
              <li role="presentation"><Link to = "/"><h4>EasyMoney</h4></Link></li>
            </ul>
        </div>
    )
}