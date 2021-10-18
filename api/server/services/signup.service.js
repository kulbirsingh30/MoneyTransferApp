import Registration from './../models/signup';
// This function will retrieve all the todos stored in the database and return an promise
const search = (filter) => {
    const promise = Registration.find(filter).exec();
    return promise;
}

//This function will create a new todo in the database
const create =(newRegistration) =>{
    const registration =new Registration(newRegistration);
    const promise =registration.save();
    return promise;
}
// This function will retrieve single todo object based on the id
const get =(id) =>{
    const promise = Registration.findById(id).exec();
    return promise;
}
// This function will update the todo object based on the id
const update = (id, body) =>{
    const promise =Registration.findByIdAndUpdate(
        {_id:id},
        body,{new:true}
        ).exec();
    return promise;
}
// This function will remove the single todo object based on the id
const remove =(id) =>{
    const promise =Registration.remove({_id: id}).exec();
    return promise;
}

export default{
    search:search,
    create:create,
    get:get,
    update:update,
    remove:remove
}