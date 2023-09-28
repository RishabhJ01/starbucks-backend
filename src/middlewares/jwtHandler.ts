import { NextFunction, Request, Response } from 'express';
import { User,IUser } from "../models/users";
import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || "";

export const handleJwt = async (_req: Request, _res: Response, next: NextFunction) => {
    try{
        const token:string = _req.cookies['access-token'];
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        const data:IUser|null = await User.findOne({email: decoded.email});
        
        if(data === null){
            _res.status(401).json({message: "Unauthorized!"});
            return;
        }
        if((data?.first_name !== decoded.first_name) || (data?.last_name !== decoded.last_name) || (data?.phone !== decoded.phone)){
            _res.status(401).json({message: "Unauthorized"})
            return;
        }
        _res.locals.user = data;
        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            _res.status(401).json({message: "Session Expired!"});
            return;
        }
        console.log(err);
        _res.status(500).json({message: "Internal server error!"});
        return;
    }
}