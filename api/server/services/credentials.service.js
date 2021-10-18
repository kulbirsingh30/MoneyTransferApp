import Credentials from './../models/credentials';
// This function will retrieve the Credentials from the database and return an promise
const search = (filter) => {
    const promise = Credentials.find(filter).exec();
    return promise;
}
// This function will create new Credentials in the database and return an promise
const save = (creds) => {
    const newCreds = new Credentials(creds);
    const promise = newCreds.save()
    return promise;
}

//This function will update the credentials in the database and returns an promise
const update = async (id, body) =>{
    const promise =await Credentials.findByIdAndUpdate({_id:id},body,{new:true}).exec();
    return promise;
}

const deleteCred = (userId) => {
    const promise = Credentials.deleteOne({userId: userId});
    return promise;
}


export default{
    search,
    save,
    update,
    deleteCred
}