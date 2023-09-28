import { Response } from "express";
// import {UserDetails} from "../utils/common.types";
// import {IUser} from "../models/users"

export const getUserDetails = async (res: Response) => {
    try{
        // console.log(res.locals.user);
        // const user:IUser = res.locals.user;
        // console.log(user);
        // const details: UserDetails = {
        //     email: user.email,
        //     phone: user.phone,
        //     first_name: user.first_name,
        //     last_name: user.last_name,
        //     address: user.address,
        //     city: user.city,
        //     state: user.state,
        //     country: user.country,
        //     postalCode: user.postalCode
        // }
        console.log(typeof(res));
        res.send({message: "Done"});
        return;
    }catch(error){
        console.log(error);
        res.send({message: "Internal Server Error!"})
        // res.status(500).json({message: "Internal Server Error!"});
        return;
    }
}