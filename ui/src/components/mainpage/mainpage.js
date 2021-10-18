import { Link } from "react-router-dom";
import "../mainpage/mainpage.scss";
import NavbarMain from '../navbar'

//   main login page
export default function MainPage(){

    return(
            <div class="main-flex">
                <div className="title-app">
                    EasyMoney
                </div>
                <div className="flex-right">
                    <h4 class="wordCarousel">
                        <div>
                            <ul class="flipd">
                                <li>Make payments faster</li>
                                <li>Connect with your Friends</li>
                                <li>Add your Bank Account</li>
                                <li>Ease Your Finances</li>
                            </ul>
                        </div>
                    </h4>
                </div>
                <div className="bt-flx">
                    <Link to="/login" className="bt-flx-in">Login</Link>
                    <Link to="/signup" className="bt-flx-in ml-4">Sign Up</Link>
                </div>
            </div>
    )
}