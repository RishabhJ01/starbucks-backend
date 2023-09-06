import { NextFunction, Request, Response } from 'express';
import { User,IUser } from "../models/users";
import * as jwt from 'jsonwebtoken';

export const handleJwt = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies['access-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
        const data:any = await User.find({email: decoded.email});
        
        if(data.length === 0){
            return res.status(401).json({message: "Unauthorized!"});
        }
        const user:IUser = data[0]
        if((user.first_name !== decoded.first_name) || (user.last_name !== decoded.last_name) || (user.phone !== decoded.phone)){
            return res.status(401).json({message: "Unauthorized"});
        }
        res.locals.user = user;
        next();
    }catch(err){
        return res.status(500).json({message: "Internal server error!"});
    }
    
}