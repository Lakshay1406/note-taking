import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserSchema=new mongoose.Schema({
    email:{type:String,required:true,unique: true},
    password:{type:String,required:true},
    notes:[noteSchema],
})

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;