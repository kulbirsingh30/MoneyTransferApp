import { connect } from "react-redux";
import { deleteUserAction } from './../../store/actions';
import { useHistory } from 'react-router-dom';
import{Link } from 'react-router-dom';
import AdminNav from "../admin-nav/adminnav";
import './userDetails.scss'
import { useState } from "react";
import axios from "axios";

// Returns user details
function UserDetails(props) {
    const { userDetails, deleteUser } = props;
    const history = useHistory();
    const {
        address, 
        bankAccountNumber, 
        city, 
        dob, 
        email, 
        fullName, 
        id, 
        identificationExpiryDate, 
        identificationIssuerState, 
        identificationNumber, 
        ssn, 
        state, 
        typeOfIdentification, 
        verifyByAdmin, 
        zipcode 
    } = userDetails;

    const onDeleteUser = (userId) => {
        const isSure = window.confirm(`Are you sure you want to deleted user "${fullName}"?`);
        if(isSure) {
            deleteUser(userId);
            history.push('/admin');
        }
    }
// put function is defined 
    const approveUser = () =>{
        axios({
            method: 'put',
            url: 'http://localhost:3000/rest/v1/users/approve',
            headers: { 'content-type': 'application/json' },    
            data: {
                email: email,
                status: true
            },
        }).then(res => {
                const data = res.data;
                console.log(data);
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/rest/v1/users',
                    headers: { 'content-type': 'application/json' },
                }).then(res => {
                        alert('User Approved');
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            })
            .catch(err => {
                if (err) throw err
            })
    }
    return (
        <div>
            <div className="container">
                <AdminNav/>
                <div className="Back-button">
                <Link to = "/admin"> <button> <span className="glyphicon glyphicon-arrow-left"></span></button></Link>
                </div>
                <div className="adminpanel-heading1">

                   <div><h2>User Details :</h2></div> 
                   <div><h2>{verifyByAdmin ? ' User Verified' : ' User Verification Pending'}</h2></div>
                   <div className="button-right"><button class="btn btn-danger" onClick={() => onDeleteUser(id)}><span className="glyphicon glyphicon-trash"></span></button></div>
                </div>
                {
                    verifyByAdmin?null:
                    <Link to="/admin" className=" bg-primary">
                    <button className="btn btn-primary p-2 text-light" onClick={approveUser}>
                        Approve User
                    </button>
                    </Link>
                }

                <div className="panel-body">
                    <table className="styled-table">
                        <tbody>  
                            <tr>
                                <th>Full Name: </th>
                                <td>{fullName}</td>
                            </tr>
                            <tr className="active-row">
                                <th>Email: </th>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <th>Address: </th>
                                <td>{address}</td>
                            </tr>
                            <tr className="active-row">
                                <th>City: </th>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <th>Zip Code: </th>
                                <td>{zipcode}</td>
                            </tr>
                            <tr className="active-row">
                                <th>State: </th>
                                <td>{state}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth: </th>
                                <td>{dob}</td>
                            </tr>
                            <tr className="active-row">
                                <th>SSN: </th>
                                <td>{ssn}</td>
                            </tr>
                            <tr>
                                <th>Bank Account Number: </th>
                                <td>{bankAccountNumber}</td>
                            </tr>
                            <tr className="active-row">
                                <th>Type of Identification: </th>
                                <td>{typeOfIdentification}</td>
                            </tr>
                            <tr>
                                <th>Identification Number: </th>
                                <td>{identificationNumber}</td>
                            </tr>
                            <tr className="active-row">
                                <th>Identification Issuer State: </th>
                                <td>{identificationIssuerState}</td>
                            </tr>
                            <tr>
                                <th>Identification Expiry Date: </th>
                                <td>{identificationExpiryDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
        </div>
    )
}
function mapStateToProps(state) {

    return { 
        userDetails: state.admin.selectedUserDetails
    };
};
const mapDispatchToProps = { deleteUser: deleteUserAction };
//connecting userdetails to component
const ConnectedUserDetails = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
export default ConnectedUserDetails;