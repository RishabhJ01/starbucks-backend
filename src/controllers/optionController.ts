import { Request, Response } from "express";
import { Option } from "../models/options";
import { Value } from "../models/value";
import mongoose from "mongoose";

export const addOptions = async (req: Request, res: Response) => {
    try{
        const {
            name,
            values
        } = req.body;

        // const existingOption = await Option.find({name: name});
        // if(existingOption)


    }catch(err){
        console.log(err);
        return res.status(500)
    }
}

export const addValues = async (req:Request, res: Response) => {
    try{
        const names = req.body.names;

        await Value.insertMany(names);

        return res.status(200).json({message: "Values added successfully!"});

    }catch(err){
        console.log(err);
        return res.status(500)
    }

}