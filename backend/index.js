import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import UserModel from './User.js';
import bcrypt from 'bcrypt';


const app=express();
// Middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors());

const mongo_uri=process.env.mongo_uri;
const router = express.Router();    

async function connect(){
    try{
        await mongoose.connect(mongo_uri);
        console.log("Connected to mongo db...");
    }
    catch(error){
        console.error(error);    
    }
}

async function comparePassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }

//conecting to mongo db
connect();



router.get("/",(req,res)=>{
    console.log("HI from server");
    res.json({message:"server is running"});
})



router.post("/login",async(req,res)=>{
    console.log("login route...");
    const givenEmail=req.body.email;
    const givenPassword=req.body.password;
    try {
        const user = await UserModel.findOne({email: givenEmail})
        if (!user) {
            console.log('Invalid email.');
            return res.status(200).json({
                status : "error",
                code : 404,
                message :"Email does not exist.",
                data : null,
            });
        }
        else{
            const storedHashedPassword=user.password;
            comparePassword(givenPassword, storedHashedPassword).then(isMatch => {
            if (isMatch) {
                console.log('successfully logged in');
                return res.status(200).json({
                    status : "success",
                    code : 200,
                    message :"successful login",
                    data : {email:givenEmail,userId:user._id},
                })
            } else {    
                console.log('Invalid password.');
                return res.status(200).json({
                        status : "error",
                        code : 200,
                        message :"Invalid password.",
                        data: null,
                });
            }
            }); 
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(200).send({ error });
    }
});


router.post("/register",async(req,res)=>{
    const givenEmail=req.body.email;
    const givenPassword=req.body.password;
    try {
        const user = await UserModel.findOne({email: givenEmail})
        if (user) {
            console.log('Email already exists.');
            return res.status(200).json({
                status : "error",
                code : 404,
                message :"Email already exists.",
                data : null,
            });
        }
        else{
            const saltRounds=parseInt(process.env.saltRounds);
            const hashPassword=await bcrypt.hash(givenPassword, saltRounds);
            const user=new UserModel({
                email:givenEmail,
                password:hashPassword,
                notes:[],
            })
            await user.save();
            console.log("new user created");
            return res.status(200).json({
                status : "success",
                code : 200,
                message :"successful login",
                data : {
                    email:givenEmail,
                    userId:user._id,

                },
            })
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(200).send({ error });
    }

});
    
router.post("/note/add",async(req,res)=>{
    try{
        const { note, email } = req.body;
        const givenEmail=email;
        if(!note || !givenEmail){
            return res.status(400).json({ error: 'Note and userId are required.' });
        }
        const user=await UserModel.findOne({email:givenEmail});
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }

        user.notes.push(note);
        await user.save();
        res.status(200).json({ message: 'Note added successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

router.post("/note/delete",async(req,res)=>{
    try{
        const { noteId, email } = req.body;
        const givenEmail=email;
        if(!noteId || !givenEmail){
            return res.status(400).json({ error: 'NoteId and userId are required.' });
        }
        // Use $pull to remove the note directly
        const user = await UserModel.findOneAndUpdate(
            { email:givenEmail },
            { $pull: { notes: { _id: noteId } } }, // Pull note by ID
            { new: true } // Return the updated document
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'Note deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})


router.post("/note/update",async(req,res)=>{
    try{
        const { email, noteId, note:updatedNote } = req.body;
        if(!noteId || !email || !updatedNote){
            return res.status(400).json({ error: 'NoteId and userId and textNote are required.' });
        }
        const updatedUser = await UserModel.findOneAndUpdate(
            { email:email, "notes._id": noteId }, // Match user and specific note
            { $set: { 
                "notes.$.title": updatedNote.title,
                "notes.$.content": updatedNote.content,
                "notes.$.updatedAt": new Date(),
            }}
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found or note not found.' });
        }
        return res.status(200).json({ message: 'Note updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }

})
router.get("/note",async(req,res)=>{
    try{
        const userId=req.query.id;
        const currUser=await UserModel.findOne({_id:userId});
        if (!currUser) {
            return res.status(404).json({ error: "User not found." });
          }
        res.status(200).json({notes:currUser.notes});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})


const PORT = process.env.PORT || 5000;

app.use(router);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });