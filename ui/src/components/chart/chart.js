import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from 'axios';

//displays the customers chart
export default function UserCharts (props) {
    const userName = props.userDetails.fullName || sessionStorage.getItem('fullName');
    const userEmail =  props.userDetails.email || sessionStorage.getItem('email');
    const [userTransactions, changeUserTransactions] = useState([]);
//post method is defined to get the data from db// 
    const getTransactions = ()=>{
        axios({
                method: 'post',
                url: 'http://localhost:3000/rest/v1/txn/in/getTxn',
                headers: { 'content-type': 'application/json' , 'authorization' : `Bearer ${sessionStorage.getItem('bankingJwt')}` },
                data: {
                    email:userEmail
                },
                withCredentials: true,
    
            })
                .then(res => {
                    const data = res.data.data;
                    changeUserTransactions(data);
                })
                .catch(err => {
                    if (err) throw err
                })
    }
    // piechart is created
    useEffect(getTransactions,[]) 
    return(
            <div>
                <h2 className="bor-card">My Activity:</h2>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Transaction Chart</div>}
                    data={[
                        ['Transactions', 'Percentage'],
                        ['Incoming Transactions', userTransactions.filter(x=>x.recieverEmail===userEmail).length],
                        ['Outgoing Transactions', userTransactions.filter(x=>x.senderEmail===userEmail).length]
                    ]}  
                    options={{
                        pieHole: 0.5,
                        colors: ['#f0f','#f00']
                    }}
                    rootProps={{ 'data-testid': '3' }}
                /> 
            </div>
  
    )}