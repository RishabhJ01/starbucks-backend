import { NextFunction, Request, Response } from 'express';
import { User,IUser } from "../models/users";
import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || "";

export const handleJwt = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string = req.cookies['access-token'];
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        const data:any = await User.find({email: decoded.email});
        
        if(data.length === 0){
            res.status(401).json({message: "Unauthorized!"});
            return;
        }
        const user:IUser = data[0]
        if((user.first_name !== decoded.first_name) || (user.last_name !== decoded.last_name) || (user.phone !== decoded.phone)){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            res.status(401).json({message: "Session Expired!"});
            return;
        }
        res.status(500).json({message: "Internal server error!"});
        return;
    }
}