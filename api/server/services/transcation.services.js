import Transactions from './../models/transcation';

// This function is used to create the transaction from database.
const create = (transaction) => {
    const txnDetails = new Transactions(transaction);
    const promise = txnDetails.save();
    return promise;
}
// This function is used to get All the transactions from database.
const getTransactions = () => {
    const promise = Transactions.find();
    return promise;
}


export default{
    create: create,
    getTransactions : getTransactions,
}
