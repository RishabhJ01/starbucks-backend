import mongoose from "mongoose";
import User from "../models/users";
import { Request, Response } from "express";

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

        let isAdmin: boolean = false;
        if(req.body.isAdmin){
            isAdmin = req.body.isAdmin;
        }
        
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
            postalCode,
            isAdmin
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

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}