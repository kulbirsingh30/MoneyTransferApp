import NodeMailer from 'nodemailer';


const sendResetEmail= async (email,password)=>{
    
    // create reusable transporter object using the default SMTP transport
    // This function is used to create transport for gmail service with username and password
    let transporter = NodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test100990@gmail.com', // generated ethereal user
            pass: 'creator@123', // generated ethereal password
        },
    });
    // This function creates the body of the email
    const mailOptions = {
        from: 'test100990@gmail.com',
        to: email,
        subject: 'Link to reset Password',
        text: 'you are receiving this because you have requested the reset of the password for your account .\n\n'
         +`your new password =${password}`
    };
    
    console.log("REACHEd sendResetEmail");
    let info = await transporter.sendMail(mailOptions)
    const isEmailSent = info ? true: false;
    return isEmailSent;
    
  }
  
const sendTransactionSuccess = (data) => {
    // This function is used to create transport for gmail service with username and password
    let transporter = NodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test100990@gmail.com', // generated ethereal user
            pass: 'creator@123', // generated ethereal password
        },
    });
        // This function creates the transaction body of the email 
    const mailOptions = {
        from: 'test100990@gmail.com',
        to: data.recieverEmail,
        subject: 'Successful Transaction',
        text: `Dear ${data.recieverName},\n\n`
         +`Greetings for the day\n\n`+`You have a new incoming transaction from ${data.senderName} of USD ${data.amount}.\n\n`
         +`Transfer Date: ${data.txnDate}\n\n`+ `Description: ${data.txnDescription?data.txnDescription:null} \n\n`
         +`Thankyou, \n\n`+ `Team EasyMoney\n\n` +`Reach out to us: +19999999999`
    };

    console.log("REACHEd sendResetEmail");
    let info =transporter.sendMail(mailOptions)
    const isEmailSent = info ? true: false;
    return isEmailSent;
}
export default {
    sendResetEmail:sendResetEmail,
    sendTransactionSuccess : sendTransactionSuccess
}