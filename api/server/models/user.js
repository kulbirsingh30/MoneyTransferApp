import mongoose from 'mongoose';
import Credentials from './credentials'
// User schema is created in Mongo Db
const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required :true
        },
        city: {
            type: String,
            required:true
           
        },
        state: {
            type: String,
            required:true
        },
        zipcode:{
            type:String,
            required:true
        },
        ssn:{   
            type:String,
            required:true
        },
        dob:{
            type:Date,
            default:Date.now()
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        typeOfIdentification:{
            type:String,
            required:true
        },
        identificationIssuerState:{
            type:String,
            required:true
        },
        identificationNumber:{
            type:String,
            required:true
        },
        identificationExpiryDate:{
            type:Date,
            default:Date.now()
        },
        bankAccountNumber:{
            type:String,
            default:null
        },
        verifyByAdmin:{
            type:Boolean,
            default:false
        }
    },
    {
        versionKey:false 
    }  
  );

  UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Users', UserSchema);

export default model;