import mongoose from 'mongoose';
// CredentialSchema is created in this model
const CredentialsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required :true
        },

        userId: {
            type: String,
            required: true
        }
    },

    {
        versionKey:false 

    }
  
  );

  CredentialsSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

CredentialsSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Credentials', CredentialsSchema);

export default model;