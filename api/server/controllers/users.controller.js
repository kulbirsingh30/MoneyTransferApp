
import userService from './../services/users.service';
import credService from './../services/credentials.service';
import encryptor from './../utils/encryptor';
import errorHandler from './../utils/errorHandler';
import credentialsService from './../services/credentials.service';

//This controller is used to get all the users
const getAll = (request, response) => {
    const promise = userService.search(); // This function will call the search function in the service.
    console.log(response);
    promise.then((signups) =>{
        response.status(200);
        response.json(signups);
    })
    .catch((e)=>{
        console.log(e);
    });
}

//This controller is used to save the user after signing up
const saveUser = async (req, res) => {
    try {
        const { user, creds } = req.body;
        const existingUsers = await userService.search();
        const existingUserErrors = errorHandler.existingUserHandler(user, existingUsers);
        if (existingUserErrors && existingUserErrors.length > 0) {
            res.status(400);
            res.json({errors: existingUserErrors});
            return;
        }
        const password = encryptor.encryptPassword(creds.password); // encrypting the password
        const savedUser = await userService.save(user);// Calling the save function in Userservice to save the password
        const credentials = {
            userId: savedUser.id,
            email: savedUser.email,
            password: password
        }
        await credService.save(credentials);// Calling the save function in credService and saving this in credential schema
        res.status(200);
        res.json(savedUser);
    } catch (err) {
        errorHandler.handleError(err, res);
    }
}

// const get =(request, response)=>{
//     try{
//         const id =request.params.id;
//         const promise = userService.get(id);// calls the get function by passing the id param to the service module for function get and the return is an promise object
//         promise.then((signup) =>{
//             response.status(200);// response status 200 is set if the request is successful.
//             response.json(signup);
//         });
//     }
//    catch (err){
//     errorHandler.handleError(err, response);
//    }
// };


// This function is to get the list of unapproved users by admin
const getPendingUser = (req,res) => {

    const promise = userService.getUser();// Calling the function getUser in userService to get all the unapproved users
    promise.then((data)=>{
        res.status(200);
        res.json({
            message:"All unapproved users",
            data : data.filter(e=>e.verifyByAdmin===false)
        })
    }).catch((e)=>{
        res.status(400);
        res.json({
            message:"Error",
            data : e
        });
    })
}

//This function is used to approve the user by Admin
const approveUser = (req,res) => {
    const { email,status } = req.body;
    const promise = userService.approve(email,status);// This function is used to call the approve function in userservice
    promise.then((data)=>{
        res.status(200);
        res.json({
            message : "User approved",
            data : data
        })
    }).catch(e=>{
        res.status(400);
        res.json({
            message: "Error",
            data : e
        })
    })
}

// This function is to find the user by email as filter
const findUserByEmail = (req,res) => { 
    const { email } = req.body;
    const promise = userService.findUserEmail(email); // This function will call the findUserEmail function in userservice by sending email as parameter
    promise.then((data)=>{
        if (data === null){
            res.status(400);
            res.json({
                message: "Error",
                data : e
            })
        }else {
            res.status(200);
            res.json({
                message : "User found",
                data : data
            })
        }

    }).catch(e=>{
        res.status(400);
        res.json({
            message: "Error",
            data : e
        })
    })   
}

const updateUserByEmail = (req,res) => {

    const { email , data} = req.body;
    
    const promise = userService.editUser(email,data);
    promise.then((data)=>{
        if (data === null){
            res.status(400);
            res.json({
                message: "Error",
                data : e
            })
        }else {
            res.status(200);
            res.json({
                message : "User found",
                data : data
            })
        }

    }).catch(e=>{
        res.status(400);
        res.json({
            message: "Error",
            data : e
        })
    }) 
}

// This function is used to delete the user
const deleteUser = (req, res) => {
    const userId = req.params["0"]; 
    const promise = userService.deleteUser(userId); // This function will call the delete user function in User service with the userId filter
    promise.then(() => {
        credentialsService.deleteCred(userId).then(() => {
            console.log('USER DELETED')
            res.json({
                isDeleted: true
            })
        });
    }).catch((e) => {
        console.log('USER NOT FOUND')
        res.json({
            err: e
        })
    })

}



export default {
    getAll,
    saveUser,
    getPendingUser,
    approveUser,
    findUserByEmail,
    deleteUser,
    updateUserByEmail
}
    

