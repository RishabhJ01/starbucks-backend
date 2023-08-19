import mongoose from "mongoose";
import {User} from "../models/users";
import { Request, Response } from "express";
import {sign} from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try{
        const {
            email,
            password,
            phone,
            first_name,
            last_name,
            address,
            city,
            state,
            country,
            postalCode
        } = req.body;
        
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(409).json({message: "User already exists!"});
        }

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password,
            phone,
            first_name,
            last_name,
            address,
            city,
            state,
            country,
            postalCode
        });

        await newUser.save();

        return res.status(201).json({message: "User registered successfully!"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: "Email or password incorrect!"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: 'Email or password incorrect!'});
        }

        const token = sign({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        return res
        .cookie("access-token", token)
        .status(200).json({
            message: "User logged in successfully!"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}