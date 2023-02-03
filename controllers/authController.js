const User=require("../models/User");
const bcrypt = require("bcrypt");//asynchronous function 
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");


///Register User

exports.registerUser = async (req,res) => {
    try{
        const {username, password, first_name, last_name, address, city, state} = req.body;
        if(!(username || password || first_name || last_name || address || city || state)){
            res.status(400).json({message: "All credentials are required"})
        }

        const oldUser = await User.findOne({username});
        if(oldUser){
            res.status(409).json({message: "User Already Exist. Please Login"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            address: address,
            city: city,
            state: state,
        })

        const user = await newUser.save();
        const token = jwt.sign(
            {user_id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "4h"}
        )

        
        res.status(200).json({status: 'user', auth_token: token});
    } catch (err) {
        res.status(500).json({status: 'error', error: err});
    }
    
}
//Login User

exports.loginUser = async (req,res) => {

    try{
        const user =await User.findOne({username:req.body.username});
        
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(user && validPassword){

            const token = jwt.sign(
                {user_id: user._id, username: user.username},
                process.env.JWT_SECRET,
                {expiresIn: "4h"}
            )
            res.status(200).json({status: 'user', auth_token: token});
        }else{
            res.status(400).send({status: 'user',message: 'Invalid credentials'});
        }



        

        
        
    }catch(err){
        res.status(500).send({status: "error", error: err})
    }
}