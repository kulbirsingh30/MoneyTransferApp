import MailingService from '../services/mailing.service';
import txnService from './../services/transcation.services';


// This function is used to create new Transaction
const createNewTransaction = (req,res) => {
    const transaction = req.body;
    const promise = txnService.create(transaction); // This will call the create function in txnService
    promise.then((data)=>{
        res.status(200);
        res.json({
            data:data,
            message:"Transaction success"
        });
        const emailSent = MailingService.sendTransactionSuccess(data); // This is used to send mail after the successful transaction
    }).catch((e)=>{
        res.status(400);
        res.json({
            error:e,
            message:"Error while creating transaction"
        })
    })


}

// This function is used to get transaction by the user
const getTransactionsByUser = (req,res) => {
    const {email} = req.body; 
    const promise = txnService.getTransactions(); //Calling the get Transaction function in txnservice.
    promise.then((data)=>{
        if(data.length === 0){ //Checking the promise object and if the length is 0 and setting the appropriate response status
            res.status(400);
            res.json({
                message: `User with Email: ${email} not found`,   
            })
        }else{
            res.status(200);
            res.json({
                message: `Data for user with Email: ${email}`,
                data : data.filter(per=>per.recieverEmail==email||per.senderEmail==email)
            })
        }

    })
}

    
export default {
    createNewTransaction : createNewTransaction,
    getTransactionsByUser : getTransactionsByUser
}