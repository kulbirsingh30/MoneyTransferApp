import mongoose from 'mongoose';
// This is used to create the signup schema
const SignUpSchema = new mongoose.Schema(
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
        password:{
            type:String,
            required:true
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
        }
    },

    {
        versionKey:false 

    }
  
  );

SignUpSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

SignUpSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Registration', SignUpSchema);

export default model;