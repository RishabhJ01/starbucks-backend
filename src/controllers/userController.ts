import { Response, Request } from "express";
import {UserDetails} from "../utils/common.types";
import {IUser} from "../models/users"

export const getUserDetails = async (_req: Request ,_res: Response) => {
    try{
        const user:IUser = _res.locals.user;
        const details: UserDetails = {
            email: user.email,
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            city: user.city,
            state: user.state,
            country: user.country,
            postalCode: user.postalCode
        }
        _res.status(200).json(details);
        return;
    }catch(error){
        console.log(error);
        _res.status(500).json({message: "Internal Server Error!"});
        return;
    }
}