import _ from 'lodash';
//Util function handle error
const handleError = (err, response) => {
    response.status(500);
    response.json(err);
}
// Function checks email,SSN and Identification already exists
const existingUserHandler = (user, userList) => {
    let errors = [];
    let filteredList = _.find(userList, {email: user.email});
    if (filteredList) {
        errors.push('Email already exists');
    }

    filteredList = _.find(userList, {ssn: user.ssn});
    if (filteredList) {
        errors.push('SSN already exists');
    }

    filteredList = _.find(userList, {
        typeOfIdentification: user.typeOfIdentification, 
        identificationIssuerState: user.identificationIssuerState,
        identificationNumber: user.identificationNumber
    });

    if (filteredList) {
        errors.push('Identification already exists');
    }
    return errors;
}

export default {
    handleError, existingUserHandler
}