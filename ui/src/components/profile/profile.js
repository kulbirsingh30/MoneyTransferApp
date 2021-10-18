import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import UserNav from "../usernav/usernav";
import "./profile.scss";

//Returns user profile
function Profile(props){
    const [userData, changeUserDetails] = useState(props.userDetails|| sessionStorage.getItem('userDetails'));
    const changeUserData = (e) => {
        e.preventDefault();
        changeUserDetails({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
    //Put request
    const updateUser = () =>{
        axios({
            method: 'put',
            url: `http://localhost:3000/rest/v1/users/edituser`,
            headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}`  },
            data: {
                    email:userData.email,
                    data:{
                        dob: userData.dob,
                        identificationExpiryDate: userData.identificationExpiryDate,
                        bankAccountNumber: userData.bankAccountNumber,
                        verifyByAdmin: userData.verifyByAdmin,
                        fullName: userData.fullName ,
                        address: userData.address,
                        city: userData.city,
                        state: userData.state,
                        zipcode: userData.zipcode,
                        ssn: userData.ssn,
                        email: userData.email,
                        typeOfIdentification: userData.typeOfIdentification,
                        identificationIssuerState: userData.identificationIssuerState,
                        identificationNumber: userData.identificationNumber
                    }
            },
            withCredentials: true,

        })
            .then(res => {
                console.log(res)
                alert('User Details Updated')
            })
            .catch(err => {
                if (err) throw err
            })
    }
    

    return (
        <div>
            <UserNav/>
            <div className="pro-con">
                
                <div className="card h-100 pro-con-in">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-2 text-primary">Personal Details</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                        <label for="fullName">Full Name</label>
                                        <input type="text" className="form-control" name="fullName" id="fullName" value={userData && userData.fullName} onChange={changeUserData} placeholder="Enter full name"></input>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="dob">Date of Birth</label>
                                        <input type="date" className="form-control" name="dob" id="dob" value={userData && userData.dob} onChange={changeUserData} placeholder="Enter Date of Birth"></input>
                                    </div> 
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    {/* <h6 className="mt-3 mb-2 text-primary">Address</h6> */}
                                    <div className="form-group">
                                    <label for="Address">Address</label>
                                    <input type="name" className="form-control" id="Address" name="address" value={userData && userData.address} onChange={changeUserData}  placeholder="Enter Address"></input>
 
                                    </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="city">City</label>
                                        <input type="name" className="form-control" name="city" id="city" value={userData && userData.city} onChange={changeUserData}  placeholder="Enter City"></input>
                                    </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="state">State</label>
                                        <input type="text" className="form-control" name="state" id="state" value={userData && userData.state} onChange={changeUserData}  placeholder="Enter State"></input>
                                    </div> 
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="zip">Zip Code</label>
                                        <input type="text" className="form-control" name="zipcode" id="zip" value={userData && userData.zipcode} onChange={changeUserData}  placeholder="Zip Code"></input>
                                    </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="ssn">SSN</label>
                                        <input type="text" className="form-control" name="ssn" id="ssn" value={userData && userData.ssn} onChange={changeUserData} placeholder="SSN"></input>
                                    </div>
                            </div>

                            <div className="row gutters ml-1">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <Link to='/user' className="btn btn-primary p-2 mr-3">Cancel</Link>
                                        <Link to="/user">
                                        <button type="button" id="submit" name="submit" className="btn btn-primary p-2" onClick={updateUser}>
                                            
                                                Update
                                            
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile