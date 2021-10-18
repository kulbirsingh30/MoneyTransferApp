import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss';
import Login from "./components/login";
import Notifications from "./components/notifications";
import Signup from "./components/signup";
import Main from "./components/mainpage";

import ResetPasswordMain from "./components/resetpassword";
import User from "./components/userpage";
import Transactions from "./components/transactions";

import NewTransaction from "./components/newtransaction";
import ApproveUser from "./components/approveuser";
import Card from "./components/card";
import UserList from './components/admin-user-list';
import UserDetails from "./components/admin-user-list/userDetails";
import UserProfile from "./components/profile";
import NewCard from "./components/newcard";
import AdminLogin from "./components/adminlogin";

// bankingJwt added in session storage.
function App() {
  
  const isLoggedIn = !!sessionStorage.bankingJwt;

  
  return (
    <div>
      
      <Notifications />
      {/* Defined all routes  */}
      <Router>

          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/admin/user/:id"> 
              <UserDetails />
            </Route>
            <Route path="/admin"> 
              <UserList />
            </Route>
            <Route path="/adminlogin"> 
              <AdminLogin/>
            </Route>
            <Route path="/forgotpass">
              <ResetPasswordMain />
            </Route>
            <Route path="/user"> 
              <User />
            </Route>
            <Route path="/transactions"> 
              <Transactions />
            </Route>
            <Route path="/newtxn"> 
              <NewTransaction />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/newcard"> 
              <NewCard/>
            </Route>
            <Route path="/approveuser"> 
              <ApproveUser />
            </Route>
            <Route path="/approvecard">
              <Card />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
