import Admin from './../models/admin';
import Credentials from './../models/credentials';

// This function is used to find the credentials with the email in the database
const find =(email) =>{
    const promise =Credentials.find({email}).exec();
    return promise;
}

//This function is used to update the password with email in the database
const updatePass = (email,password) => {
    const promise = Credentials.findOneAndUpdate({email},{password});
    return promise;
}

const postAdminAcc = (email) => {
    const promise = Admin.find({email}).exec();
    return promise;
}


export default{
    find:find,
    updatePass:updatePass,
    postAdminAcc:postAdminAcc
}