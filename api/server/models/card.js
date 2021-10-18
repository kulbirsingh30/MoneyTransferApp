import mongoose from 'mongoose';

// Card Schema is created in this model
const CardSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        typeOfCard: {
            type: String,
            required: true
        },
        bankAccountNumber: {
            type: String,
            required : true
        },
        cardNumber:{
            type:String,
            required:true
        },
        pin: {
            type:String,
            required:true
        },
        cvv:{
            type:String,
            required:true
        },
        bankName:{
            type:String,
            required:true
        },
        expiryDate:{
            type:Date,
            required:true
        },
        cardHolder:{
            type:String,
            required:true
        }
        
    },
    {
        versionKey:false 
    }
  
  );

  CardSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

CardSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Card', CardSchema);

export default model;