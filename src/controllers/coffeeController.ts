import { Request, Response } from "express";
// import mongoose from "mongoose";

export const addCoffee = async(_req: Request, _res: Response) => {
    try{
        const {
            name,
            category,
            options
        } = _req.body;
        console.log(name);
        console.log(category);
        console.log(options[0].values);
        _res.status(201).json({message: "Done"})
    }catch(err){
        console.log(err);
        _res.status(500).json({message: "Internal Server Error!"});
        return;
    }
}