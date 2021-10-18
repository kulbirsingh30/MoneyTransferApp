import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './userpage.scss';
import './userpage.scss';
import './card.scss';
import UserNav from "../usernav/usernav";
import Charts from "../chart";
import card from '../../images/credit-card.png'

//User page component
export default function Userpage(props){
    //getting data from session storage
    const userName = props.userDetails.fullName || sessionStorage.getItem('fullName');
    const userEmail =  props.userDetails.email || sessionStorage.getItem('email');
    const approvedByAdmin = props.userDetails.verifyByAdmin || sessionStorage.getItem('verifyByAdmin');
    
    const [userTransactions, changeUserTransactions] = useState([]);
    const [userCardDetails, changeUserCardDetails] = useState([]);
    //Get Transactions for user
    const getTransactions = ()=>{
        axios({
                method: 'post',
                url: 'http://localhost:3000/rest/v1/txn/in/getTxn',
                headers: { 'content-type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}`  },
                data: {
                    email:userEmail
                },
                withCredentials: true,
    
            })
                .then(res => {
                    const data = res.data.data;
                    let revData = data.reverse();
                    changeUserTransactions(revData);
                })
                .catch(err => {
                    if (err) throw err
                });

    }
    //Get Card details for user
    const getUserCard = () => {
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
                changeUserCardDetails(data);
            })
            .catch(err => {
                if (err) throw err
            });
    }
    useEffect(getTransactions,[]);
    useEffect(getUserCard,[]);
    const date = new Date(userCardDetails.expiryDate);
    return(
        <div className = "con-user">
            {/* <NewTransaction getTransactions = {getTransactions} /> */}
            <UserNav {...props.userDetails.verifyByAdmin}/>

            <div className="user-container">
                <h2 className="ml-5">
                    Hello {userName},
                </h2>
                {
                    approvedByAdmin?
                        <div>
                        <div className= "up-tabs">
                        <div className= "main-tabs-sm p-5">
                            <h2 className="mt-5">Account Balance</h2>
                            <h2 className="mt-4 acc-font"> 
                                {(()=>{
                                    let sum = 0;
                                    userTransactions.forEach(e=>{
                                        if(e.recieverEmail===userEmail){
                                            sum = sum+e.amount
                                        }else if(e.senderEmail===userEmail){
                                            sum = sum-e.amount
                                        }
                                        
                                        return sum;
                                    })
                                    return(sum);
                                })()}
                            </h2>
                        </div>
                        <div className= "main-tabs-sm p-5">
                            <h2 className="mt-5">Total Transactions</h2>
                            <h2 className="mt-4 acc-font">
                                {
                                    userTransactions.length
                                }
                            </h2>
                        </div>
                        <div className="main-tabs-lg">
                            {
                                userCardDetails.length === 0 ? <h2 className="mt-5">No Card Added</h2> :
                                <div class="card bg-card">
                                <div class="face front">
                                    <h3 class="debit">{userCardDetails.typeOfCard}</h3>
                                    <h3 class="bank">{userCardDetails.bankName}</h3>
                                    <img src={card} class="chip"/>
                                    {/* {userCardDetails.cardNumber.slice(5,9)} {userCardDetails.cardNumber.slice(10,14)} {userCardDetails.cardNumber.slice(15,19)} */}
                                    <h3 class="number">
                                    {userCardDetails.cardNumber} 
                                    </h3>
                                    <h5 class="valid"><span>Valid<br></br>thru</span><span>{date.getMonth()}/{date.getFullYear()}</span></h5>
                                    <h5 class="cardHolder">{userCardDetails.cardHolder}</h5>
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
                            }
                        </div>
                        
                    </div>
                    <div className="down-tabs mt-5">
                        <div className="down-display ml-5">
                            <h2 className="bor-card">Transactions:</h2>
                            <table  className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Entity</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTransactions && userTransactions.map((e,i)=>{
                                        while(i<5){
                                            return(
                                            
                                                <tr>
                                                    <th scope="row">{i+1}</th>
                                                    <td  className= {e.recieverEmail===userEmail?"positive":"negative"} >{e.recieverEmail===userEmail?`From ${e.senderName}`:`To ${e.recieverName}`}</td>
                                                    <td >{e.txnDescription}</td>
                                                    <td className = {e.recieverEmail===userEmail?"positive":"negative"}>{e.amount}</td>
                                                    <td>{e.txnDate.slice(0,10)} {e.txnDate.slice(11,19)}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="down-display mr-5">
                            <Charts />
                        </div>
                    </div>
                </div>
                :
                <div class="alert alert-info w-100 ml-5 mt-5">
                    <h4><strong>User Account needs Admin Approval</strong></h4> 
                </div>
                }
                
            </div>
        </div>
    )
}
