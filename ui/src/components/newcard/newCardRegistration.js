import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import UserNav from "../usernav/usernav";
import "./newcard.scss";

// It will check first if the user has already registered for the card or not.
// If he didn't register, then the card registration will be available for him.
// However, the card registration will not be available for the user. 

export default function  NewCardRegistration(props) {
    const userEmail = props.userDetails.email || sessionStorage.getItem('email');
    const [apiHit, changeApiHit] = useState("Pending");
    const [input,changeInput] = useState({
        
        typeOfCard: "",
        cardNumber : "",
        email:userEmail,
        bankAccountNumber : "",
        pin:"",
        cvv:"",
        bankName:"",
        expiryDate:"",
        cardHolder: "",
        
        
    })
    const handleInputChange = (e) => {
    e.preventDefault();           
    changeInput({
        ...input,
        [e.target.name]:e.target.value
    })

    }
// It will call the post api to add card details of user

    const addTxn = () =>{
        axios({
            
            method: 'post',
            url: 'http://localhost:3000/rest/v1/card/add',
            headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}` },
            data: input,
            withCredentials: true,

        })
            .then(res => {
                alert("Card Added Successful!");
                
                changeInput({
                    typeOfCard: "Debit",
                    cardNumber : "",
                    email:userEmail,
                    bankAccountNumber : "",
                    pin:"",
                    cvv:"",
                    bankName:"",
                    expiryDate:"",
                    cardHolder: "",
        
                })
                
            })
            .catch(err => {
                if (err) throw err
            })
    }

// It will call the delete api to remove the card of that user

    const deleteCard = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/rest/v1/card/deleteCard',
            headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}`  },
            data: {
                email:userEmail
            },
            withCredentials: true,

        })
            .then(res => {
                alert("Card Deleted Successfully")
            })
            .catch(err => {
                if (err) throw err
            });
    }
    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3000/rest/v1/card/getUserCard',
            headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}`  },
            data: {
                email:userEmail
            },
            withCredentials: true,

        })
            .then(res => {
                const data = res.data.data;
                changeInput(data);
                changeApiHit("Success")
            })
            .catch(err => {
                if (err) throw err
            });
    },[])
    const date = new Date(input.expiryDate);
    return(
        <div>
            <UserNav />
            {
                apiHit==="Pending"?
                <div className="user-container he-form">
                <div className="panel-heading ml-5"><h1>Add New Card / Bank Account</h1></div>
                <div className="panel-body ml-5 w-75">
                    <div className="well">
                        {/* txnType amt currency*/}
                        <div className="form-group">
                            <label>Card Type</label>
                            <input type="text" name="typeOfCard" className="form-control" onChange={handleInputChange}  value={input.typeOfCard} required/>
                        </div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="number" name="cardNumber" className="form-control" onChange={handleInputChange} value={input.cardNumber} required/>
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" name="cardHolder" className="form-control" onChange={handleInputChange} value={input.cardHolder} required/>
                        </div>
                        <div className="form-group">
                            <label>Card Valid Thru</label>
                            <input type="date" name="expiryDate" className="form-control" onChange={handleInputChange} value={input.expiryDate} required/>
                        </div>
                        <div className="form-group">
                            <label>Security Code</label>
                            <input type="password" name="cvv" className="form-control" onChange={handleInputChange} value={input.cvv} required/>
                        </div>
                        
                    </div>
                    
                    <div className="well">
                        {/* beneficiary name email drawee bank branch toaccount*/}
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input type="text" name="bankName" className="form-control" onChange={handleInputChange} value={input.bankName} required/>
                        </div>
                        <div className="form-group">
                            <label>Bank Account Number</label>
                            <input type="number" name="bankAccountNumber" className="form-control" onChange={handleInputChange} value={input.bankAccountNumber} required/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" value={input.email} readOnly/>
                        </div>
                        
                    </div>
                    <Link to="/user">
                    <button type="submit" onClick={addTxn} className="btn btn-primary">
                        
                            Register
                        
                    </button>  
                    </Link>         
                </div>
            </div>
                :
                <div className = "pay">
                    <div className="pay-in">
                        <div className="panel-heading"><h1>My Card</h1></div>
                        <div className="well">
                        <div className="form-group">
                            <label>Card Type</label>
                            <input type="text" name="typeOfCard" className="form-control" value={input.typeOfCard} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="number" name="cardNumber" className="form-control" value={input.cardNumber} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" name="cardHolder" className="form-control" value={input.cardHolder} readOnly/>
                        </div>
                        </div>
                        <div className="well">
                        {/* beneficiary name email drawee bank branch toaccount*/}
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input type="text" name="bankName" className="form-control" value={input.bankName} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Bank Account Number</label>
                            <input type="number" name="bankAccountNumber" className="form-control" value={input.bankAccountNumber} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" value={input.email} readOnly/>
                        </div>
                        <Link to="/user">
                        <button className="btn btn-danger p-2" onClick={deleteCard}>
                            
                                Delete
                            
                        </button>
                        </Link>
                    </div>
                    </div>
                    <div class="card bg-card">
                            <div class="face front">
                                <h3 class="debit">{input.typeOfCard}</h3>
                                <h3 class="bank">{input.bankName}</h3>
                                <img src="../../images/card.jpg" class="chip"/>
                                {/* {input.cardNumber.slice(5,9)} {input.cardNumber.slice(10,14)} {input.cardNumber.slice(15,19)} */}
                                <h3 class="number">
                                {input.cardNumber} 
                                </h3>
                                <h5 class="valid"><span>Valid<br></br>thru</span><span>{date.getMonth()}/{date.getFullYear()}</span></h5>
                                <h5 class="cardHolder">{input.cardHolder}</h5>
                            </div>
                            <div class="face back">
                                <div class="blackbar"></div>
                                <div class="ccvtext">
                                    <h5>Authorized Signature-not valid unless signed</h5>
                                    <div class="whitebar"></div>
                                    <div class="cvv">***</div>

                                </div>
                                <p class="text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempore fugit vitae ratione ullam a omnis, soluta at libero! Quis minus laboriosam iste labore! Tempore, totam deserunt! Et, consequuntur vitae!
                                </p>
                            </div>

                        </div>

                </div>
            }
        </div>
    )
}