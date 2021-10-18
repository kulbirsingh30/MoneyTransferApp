import './transactions.scss';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UserNav from '../usernav/usernav';

//user transactions component
export default function UserTransaction (props) {
    const userName = props.userDetails.fullName || sessionStorage.getItem('fullName');
    const userEmail = props.userDetails.email || sessionStorage.getItem('email');
    const [userTransactions, changeUserTransactions] = useState([]);
    console.log(userTransactions.length)
    const getTransactions = ()=>{
        axios({
                method: 'post',
                url: 'http://localhost:3000/rest/v1/txn/in/getTxn',
                headers: { 'content-type': 'application/json' ,'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}`},
                data: {
                    email:userEmail
                },
                // withCredentials: true,

            })
                .then(res => {
                    const data = res.data.data;
                    
                    changeUserTransactions(data.reverse());
                })
                .catch(err => {
                    if (err) throw err
                })
    }
    useEffect(getTransactions,[]) 
    return(
        <div>
            <UserNav />
            <div className="user-container">
            <div className="panel-heading ml-5 head-txn"><h1>Transactions</h1></div>
            {
                userTransactions.length===0?
                    <div class="alert alert-info w-75 ml-5 mt-5">
                        <h4><strong>User has no transactions</strong></h4> 
                    </div>
                : 
                <div className="ml-5 mt-5">
                    {
                        userTransactions && userTransactions.map((e,i)=>{
                            return(
                                <div className="txn-container">
                                    <div>
                                        {
                                            e.txnIcon===""||e.txnIcon.length===0?  
                                                                             
                                            <svg className="ic sv">
                                                <circle cx="20" cy="20" r="20" fill="rgb(245, 244, 244)" />
                                            </svg>     
                                            :<span className="ic">{e.txnIcon}</span>
                                        }
                                    </div>
                                    <div>
                                        <span className = {`${e.recieverEmail===userEmail?"positive":"negative"} txn-amt`}>
                                            {e.amount}
                                        </span>
                                    </div>
                                    <div>
                                        <span className = {`${e.recieverEmail===userEmail?"positive":"negative"} txn-amt`}>
                                            {e.recieverEmail===userEmail?`From ${e.senderName}`:`To ${e.recieverName}`}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="txn-amt">
                                            {e.txnDescription}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="txn-amt">
                                            {e.txnDate.slice(0,10)} {e.txnDate.slice(11,19)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="txn-amt">
                                            {e.recieverEmail===userEmail?
                                                <span class="badge badge-success p-2">Incoming</span>
                                                :
                                                <span class="badge badge-danger p-2">Outgoing</span>
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            </div>

            
        </div>
    )
}

// function NewTransaction({getTransactions})