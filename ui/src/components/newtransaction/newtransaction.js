import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import UserNav from "../usernav/usernav";
import Picker from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';

//If a customer wants to generate a new txn, he can do using this. 
export default function  NewTransactionImpl(props) {
    
    const userName = props.userDetails.fullName || sessionStorage.getItem('fullName');
    const userEmail = props.userDetails.email || sessionStorage.getItem('email');
    const history = useHistory();
    const [input,changeInput] = useState({
        
        txnType: "Direct Transfer",
        amount : null,
        fromAccount:"",
        toAccount : "",
        recieverName:"",
        senderName:userName,
        recieverEmail:"",
        senderEmail:userEmail,
        txnIcon: "",
        txnDescription:""
        
    })
    const handleInputChange = (e) => {
    e.preventDefault();           
    changeInput({
        ...input,
        [e.target.name]:e.target.value
    })

    }
  // It will call the post api to add txn details of user  
    const addTxn = () =>{
        input.recieverEmail===userEmail?alert("Email cannot be same"):
        axios({
            
            method: 'post',
            url: 'http://localhost:3000/rest/v1/txn/in',
            headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}` },
            data: input,
            withCredentials: true,

        })
            .then(res => {
                alert("Transaction Successful!");
                changeInput({
                    txnType: "Direct Transfer",
                    amount : 0,
                    fromAccount:"",
                    toAccount : "",
                    recieverName:"",
                    senderName:userName,
                    recieverEmail:"",
                    senderEmail:userEmail,
                    txnIcon: null,
                    txnDescription:""
                })
                history.push('/transactions')
            })
            .catch(err => {
                if (err) throw err
            })
    }
    const onEmojiClick = (e,emojiObject) =>{
        e.preventDefault();
        console.log(emojiObject)
        changeInput({
            ...input,
            txnIcon:emojiObject.emoji
        })
    }
    return(
        <div>
            <UserNav />
            <div className="user-container">
                <div className="panel-heading ml-5"><h1>New Transaction</h1></div>
                <div className="panel-body ml-5 w-75">
                    <div className="well">
                        {/* txnType amt currency*/}
                        <div className="form-group">
                            <label>Transaction Type</label>
                            <input type="text" name="txnType" className="form-control" value={input.txnType} readOnly/>
                        </div>
                        {/* Amount*/}
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" name="amount" min="0" className="form-control" onChange={handleInputChange} value={input.amount} required/>
                        </div>
                        {/* Description*/}
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="txnDescription" className="form-control" onChange={handleInputChange} value={input.txnDescription} required/>
                        </div>
                        {/* Icons*/}
                        <div className="form-group">
                            <label>Icons</label>
                            <h5>{input.txnIcon}</h5>
                            
                            <div className="icon-list">
                                <Picker onEmojiClick={onEmojiClick} pickerStyle={{width:'100%'}}/>
                            </div>

                        </div>
                    </div>
                    <div className="well">
                        {/* beneficiary name email drawee bank branch toaccount*/}
                        <div className="form-group">
                            <label>Reciever Name</label>
                            <input type="text" name="recieverName" className="form-control" onChange={handleInputChange} value={input.recieverName} required/>
                        </div>
                        <div className="form-group">
                            <label>Reciever Email</label>
                            <input type="text" name="recieverEmail" className="form-control" onChange={handleInputChange} value={input.recieverEmail} required/>
                        </div>
                        <div className="form-group">
                            <label>Reciever Bank Account</label>
                            <input type="text" name="toAccount" className="form-control" onChange={handleInputChange} value={input.toAccount} required/>
                        </div>
                    </div>
                    <div className="well">
                        <div className="form-group">
                            <label>Sender Email</label>
                            <input type="text" name="senderEmail" className="form-control" value={input.senderEmail} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Sender Bank Account</label>
                            <input type="text" name="fromAccount" className="form-control" value={input.fromAccount} readOnly/>
                        </div>
                        {/* senderemail fromaccount */}
                    </div>  
                    <button type="submit" onClick={addTxn} className="btn btn-primary">
                        
                            Complete Transaction
                        

                    </button>       
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}