import UserList from "./userList";
import { connect } from "react-redux";
import { setUserList, setSelectedUserDetails } from './../../store/actions'
import { useEffect } from "react";
import AdminLogin from "../adminlogin";

// Returns list of users

//authenticating user
function UserListPage(props) {
    useEffect(() => {
        props.setUserList();
    }, []);
    //checking for token value
    if(sessionStorage.getItem('bankingJwt')){
        return <UserList {...props}/>
    }else{
        window.location.href = '/#/adminlogin'
        return <AdminLogin />
    }
}

function mapStateToProps(state) {
    return { 
        userList: state.admin.userList,
    };
};
const mapDispatchToProps = { setUserList, setSelectedUserDetails };
const ConnectedUserListPage = connect(mapStateToProps, mapDispatchToProps)(UserListPage)
export default ConnectedUserListPage;