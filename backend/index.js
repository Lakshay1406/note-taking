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
            console.log('invalid email');
            return res.status(200).json({
                status : "error",
                code : 404,
                message :"Email does not exsist.",
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
                    data : {email:givenEmail},
                })
            } else {
                console.log('invalid password');
                return res.status(200).json({
                        status : "error",
                        code : 200,
                        message :"invalid password",
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
            console.log('email already exsists');
            return res.status(200).json({
                status : "error",
                code : 404,
                message :"Email already exsists.",
                data : null,
            });
        }
        else{
            const saltRounds=parseInt(process.env.saltRounds);
            const hashPassword=await bcrypt.hash(givenPassword, saltRounds);
            const user=new UserModel({
                email:givenEmail,
                password:hashPassword,
            })
            await user.save();
            console.log("new user created");
            return res.status(200).json({
                status : "success",
                code : 200,
                message :"successful login",
                data : {email:givenEmail},
            })
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(200).send({ error });
    }

});
    





const PORT = process.env.PORT || 5000;

app.use(router);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });