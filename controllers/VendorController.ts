import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { ValidatePassword } from "../utility/PasswordUtility";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = <VandorLoginInputs>req.body;

    const existingVendor = await FindVendor("", email);
    
    if(existingVendor){
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);
        if(validation){
            res.json(existingVendor);    
        }
        else{
            res.json({
                message: 'Invalid password'})
        }
    }
    else{
        res.json({
            message: 'Vendor not found'})
    }
}