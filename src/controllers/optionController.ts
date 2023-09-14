import { Request, Response } from "express";
import { Option, IValue } from "../models/options";
import mongoose from "mongoose";

export const addOptions = async (req: Request, res: Response) => {
    try{
        const {
            name,
            values
        } = req.body;

        const existingOption = await Option.findOne({name: name});
        if(existingOption){
            return res.status(409).json({message: "Option already present!"});
        }
        const option = new Option({
            _id: new mongoose.Types.ObjectId(),
            name,
            values
        });
        await option.save();

        return res.status(200).json({message: "Option added successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Invalid server error!"});
    }
}

export const updateOption = async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const values = req.body.values;
        console.log(values[0]);
        await Option.findOneAndUpdate(
            {_id: id},
            {
                $push: {values: {$each: values} }
            },
            {
                new: true
            }
        )
        return res.status(200).json({message: "Done"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Invalid server error!"})
    }
}

export const getAllOptions = async (req:Request, res: Response) => {
    try{
        const allOptions = await Option.find();
        return res.status(200).json(allOptions);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Invalid server error!"});
    }
}