import { Request, Response } from "express";
import { Option, IOption, IValue} from "../models/options";
import mongoose from "mongoose";

export const addOptions = async (_req: Request, _res: Response) => {
    try{
        const {
            name,
            values
        } = _req.body;

        const existingOption:IOption|null = await Option.findOne({name: name});
        if(existingOption){
            _res.status(409).json({message: "Option already present!"});
            return;
        }
        const option:IOption = new Option({
            _id: new mongoose.Types.ObjectId(),
            name,
            values
        });
        await option.save();

        _res.status(200).json({message: "Option added successfully"});
        return;
    }catch(err){
        console.log(err);
        _res.status(500).json({message: "Invalid server error!"});
        return;
    }
}

export const updateOption = async(_req: Request, _res: Response) => {
    try{
        const id = _req.params.id;
        const values:Array<IValue> = _req.body.values;
        await Option.findOneAndUpdate(
            {_id: id},
            {
                $push: {values: {$each: values} }
            },
            {
                new: true
            }
        )
        _res.status(200).json({message: "Done"});
    }catch(err){
        console.log(err);
        _res.status(500).json({message: "Invalid server error!"})
        return;
    }
}

export const getAllOptions = async (_req:Request, _res: Response) => {
    try{
        const allOptions = await Option.find();
        _res.status(200).json(allOptions);
        return;
    }catch(err){
        console.log(err);
        _res.status(500).json({message: "Invalid server error!"});
        return;
    }
}