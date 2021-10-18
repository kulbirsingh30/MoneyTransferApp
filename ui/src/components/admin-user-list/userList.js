

import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import AdminNav from '../admin-nav/adminnav';
import axios from 'axios';
import "./userList.scss";

//displaying users to User List
function UserList(props) {

    const { userList, setSelectedUserDetails } = props;

    const history = useHistory();
    
    console.log(props)

    const navigateToUserDetails = useCallback((userDetails) => {
        history.push(`/admin/user/${userDetails._id}`);
        setSelectedUserDetails(userDetails);

    });


    return (
        
        <div>
           
            <div className="container">
            <AdminNav/>
                <div className="adminpanel-heading"><h1>Users</h1></div>
                <div className="panel-body">
                <table  className="table table-striped table-hover">
               <thead>
                   <tr>
                       <th scope="col">#</th>
                       <th scope="col">Full Name</th>
                       <th scope="col">Address</th>
                       <th scope="col">Verify by Admin</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {userList && userList.map((e,i)=>{
                       return(
                           <tr onClick={() => navigateToUserDetails(e)}>
                               <th scope="row">{i+1}</th>
                               <td>{e.fullName}</td>
                               <td>{e.address}</td>
                               <td>{e.verifyByAdmin ? 'Approved': 'Pending'}</td>
                           </tr>
                       )
                   })}
               </tbody>
           </table>
                </div>
            </div>
    
        </div>
    ) 

}

export default UserList;