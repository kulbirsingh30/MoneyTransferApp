import mongoose from 'mongoose';
// Transaction schema is created in the mongodb
const TranscationSchema = new mongoose.Schema(
    {
        txnType: {
            type: String,
            required: true
        },
        txnDate: {
            type: Date,
            default: Date.now
        },
        amount : {
            type : Number, 
            required: true
        },
        fromAccount:{
            type : String        
        },
        toAccount : {
            type : String     
        },
        recieverName:{
            type : String, 
            required : true
        },
        senderName:{
            type: String,
            required: true
        },
        recieverEmail:{
            type : String,
            required : true
        },
        senderEmail:{
            type : String,
            required : true
        },
        txnIcon: {
            type:String,
        },
        txnDescription:{
            type:String
        }
    
    },

    {
        versionKey:false 
    }
  
  );

  TranscationSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

TranscationSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('transcations', TranscationSchema);

export default model;