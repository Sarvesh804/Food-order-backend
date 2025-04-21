import express, { Request,Response,NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vandor } from "../models/Vendor";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";
import { hash } from "bcrypt";

export const FindVendor = async (id:string| undefined, email?: string) => {
    if(email){
        const vandor = await Vandor.findOne({email: email});
        return vandor;
    }else{
        const vandor = await Vandor.findById(id);
        return vandor;
    }
}


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    
    const {name , ownerName, foodType, pincode, address, phone, email, password} = <CreateVendorInput>req.body;

    const existingVendor = await FindVendor("", email);
    if(existingVendor){
        res.status(400).json({
            message: 'Vendor already exists'
        }); 
    }


    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    const createdVendor = await Vandor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType, 
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password :hashedPassword,
        salt:salt,
        rating: 0,
        serviceAvailable: true,
        coverImages: ['image1', 'image2']
    })

    res.json(createdVendor);
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vandor.find();

   if(vendors !== null){
        res.json(vendors);
   }
   if(vendors.length === 0){
    res.json({message: 'No vendors found'})
   }
}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;
    const vendor = await FindVendor(vendorId);

    if(vendor !== null){
        res.json(vendor);
    }
    if(vendor === null){
        res.json({message: 'No vendor found'})
    }
}