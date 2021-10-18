import loginService from "../services/login.service";
import encryptor from "../utils/encryptor";
import jwtUtils from './../utils/jwt';
import MailingService from "../services/mailing.service" ;
import CredentialService from "../services/credentials.service";
import usersService from "../services/users.service";


// This function is used to reset the password by sending the password through email by the user.
const emailReset = async (request, response) => {

    try{
        
        const{email}=request.query; // Retrieving the query string params
        const userList = await loginService.find(email); // Retrieving the user through the email filter
        if(userList.length==0){
            //console.log("Reached Inside");
            response.json({
                isEmailSent: false,
                message:"Email does not exist"
            });
        }
        else{
            const userId =userList[0].userId;
            const email =userList[0].email;
            const id= userList[0]._id;
            const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7); //Generating randowm password
            const hashPassword =encryptor.encryptPassword(password); //Encrypting the passsword
            const resetBody ={userId,email,password:hashPassword};
            const updatePassword =await CredentialService.update(id,resetBody);// Calling the update method in credential service and updating the credentials schema
            const emailSent = await MailingService.sendResetEmail(email,password);// Calling the Mailingservice and sending the new password.
            response.json({
                isEmailSent: emailSent,
                message: `Email with new password sent to: ${email}`
            });
           
        }        
    }
    
    catch(e){
        console.log(e);
    }
    
}

// This controller is used for login to the applicaton
const login = async (request, response) => {
    const { email, password } = request.body;
    const creds = await loginService.find(email);
    if (creds.length < 1) {
        response.status(401);
        response.json({error: {message: `${email} does not exist`}});
        return;
    }
    
    const jwtToken = jwtUtils.generateAccessToken({email}); // This function is used to call jwt token function and generate the token
    const userDetails = await usersService.findUserEmail(email);
    const hashedPassword = creds[0].password;
    const isAuthenticated = encryptor.authenticate(password, hashedPassword); 
    // This function is used to authenticate the encrypted password
    isAuthenticated?response.json({isAuthenticated,jwtToken,userDetails}):response.json({isAuthenticated})
}

const postAdmin = async (req,res) => {
    const {email, password} = req.body;
    const promise = await loginService.postAdminAcc(email);
    if(promise.length<1){
        res.status(401);
        res.json({error: {message: `${email} does not exist`}});
        return;
    }
    const jwtToken = jwtUtils.generateAccessToken({email}); 
    const hashedPassword = promise[0].password;
    const isAuthenticated = encryptor.authenticate(password, hashedPassword);
    isAuthenticated?res.json({isAuthenticated,jwtToken}):response.json({message: `Password incorrect`});
}
const changePass =(req,res) => {
    const {email} = req.params;
    const {password} = req.body;
    const passwordEnc = encryptor.encryptPassword(password);

    const promise = loginService.updatePass(email,passwordEnc);
    promise.then((email)=>{
        if(email===null){
            res.status(400);
            res.json({
                message : "Email not found"
            })
        }else{
            res.status(200);
            res.json({
                message : "Password Updated",
                data : email
            })
        }

    }).catch((e)=>{

    });

    
}
export default{
    login: login,
    changePass : changePass,
    postAdmin : postAdmin,
    emailReset :emailReset
}

