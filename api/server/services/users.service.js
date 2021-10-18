import User from './../models/user';
// This function is used to find the user in the mongo db
const search = (filter) => {
    const promise = User.find(filter).exec();
    return promise;
}
// This function is used to create new user in the mongodb
const save = (user) => {
    const newUser = new User(user);
    const promise = newUser.save()
    return promise;
}
const getUser = () => {
    const promise = User.find().exec();
    return promise;
}
//This function is used to update the verifyByAdmin in the mongodb
const approve = (email,status)=>{
    const promise = User.findOneAndUpdate({email},{verifyByAdmin : status}).exec();
    return promise;
}

// This function is used to find single user with email Id
const findUserEmail = (email) => {
    const promise = User.findOne({email:email}).exec();
    return promise;
}
// This function is used to edit user and update the data.
const editUser = (email,data) => {
    const promise = User.findOneAndUpdate({email:email},data).exec();
    return promise;
}

// This function is used to delete the user with the help of userId
const deleteUser = (userId) => {
    const promise = User.deleteOne({_id: userId});
    return promise;
}
// const get =(id) =>{
//     const promise = User.findById(id).exec();
//     return promise;
// }

// const get =(id) =>{
//     const promise = User.findById(id).exec();
//     return promise;
// }

export default{
    search,
    save,
    getUser,
    approve,
    editUser,
    findUserEmail,
    deleteUser
}
