import mongoose from 'mongoose';
// Admin Schema is created with email and password data
const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required :true
        }
    },

    {
        versionKey:false 

    }
  
  );

  AdminSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

AdminSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Admin', AdminSchema);

export default model;