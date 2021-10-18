import Card from './../models/card';
//This function will create the new card
const newData = (data) => {
    const card = new Card(data);
    const promise = card.save();
    return promise;
}
//This function will retrieve the card details through email parameter
const getUserCard = (email) => {
    const promise = Card.findOne({email}).exec();
    return promise;
}

//This function will retrieve all the find user for the card
const findUser = () => {
    const promise = Card.find();
    return promise
}

const deleteUserCard = (email) => {
    const promise = Card.findOneAndDelete({email}).exec();
    return promise;
}

export default{
    newData:newData,
    getUserCard:getUserCard,
    findUser:findUser,
    deleteUserCard:deleteUserCard
}