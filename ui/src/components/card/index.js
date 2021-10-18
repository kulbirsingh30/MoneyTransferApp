 
import { useEffect, useState } from "react";
import UserNav from '../usernav/usernav';
import axios from 'axios';
 
// It will return a table which displays all the users who enrolled for the card. 
// It has button which provides approval and denial rights to admin

export default function Card(){
 
   const [cardData, setCardData] = useState([{
       "fullName": "",
       "address": "",
       "verifyByAdmin": false
   }]);
 
   const getCardList = () => {
 
       axios({  
           method: 'get',
           url: 'http://localhost:3000/rest/v1/users',
           headers: { 'content-type': 'application/json' },
       }).then(res => {
               const data = res.data;
               console.log(data);
               setCardData(data)
           })
           .catch(err => {
               if (err) throw err
           })
       return;  
       
      
   }
 // When admin approves the card, the flag gets changed in the database
 
   const approveCard = (userEmail,status) => {
       axios({
           method: 'put',
           url: 'http://localhost:3000/rest/v1/users/approve',
           headers: { 'content-type': 'application/json' },
           data: {
               email: userEmail,
               status: status === "YES"? true:false
           },
       }).then(res => {
               const data = res.data;
               console.log(data);
               axios({
                   method: 'get',
                   url: 'http://localhost:3000/rest/v1/users',
                   headers: { 'content-type': 'application/json' },
               }).then(res => {
                       const data = res.data;
                       console.log(data);
                       setCardData(data)
                   })
                   .catch(err => {
                       if (err) throw err
                   })
           })
           .catch(err => {
               if (err) throw err
           })
       return;
   }
 
   useEffect(getCardList,[])
 
   return (
       <div className="container">
           <UserNav />
           <table  className="table user-container">
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
                   {cardData && cardData.map((e,i)=>{
                       return(
                           <tr>
                               <th scope="row">{i+1}</th>
                               <td>{e.fullName}</td>
                               <td>{e.address}</td>
                               <td>{e.verifyByAdmin ? 'Approved': 'Denied'}</td>
                               {
                                   e.verifyByAdmin ? (
                                       e.verifyByAdmin?<td> Approved </td>:<td> Denied </td>
                                   ): (
                                    <div>
                                      <td><button onClick={() => approveCard(e.email,"YES")}>Approve</button></td>
                                    <td><button onClick={() => approveCard(e.email,"NO")}>Reject</button></td>  
                                    </div>
                                   
                                   )
                               }
                           </tr>
                       )
                   })}
               </tbody>
           </table>
 
      
          
       </div>
   )
}
 

