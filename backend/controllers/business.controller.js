import { Business } from "../models/business.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async(req, res) =>{
    try {
        
        const {businessName} = req.body;
        if(!businessName){
            return res.status(400).json({
                message:"Business name is required",
                success:false
            });
        }
        let business = await Business.findOne({name:businessName});
        if(business){
            return res.status(400).json({
                message:"You Can't register same business",
                success:false
            })
        };
        business = await Business.create({
            name:businessName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Business registered successfully.",
            business,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getBusiness = async (req,res) => {
    try {
        const userId = req.id;
        const businesses = await Business.find({userId});
        if(!businesses){
            return res.status(404).json({
                message:"Businesses not found :(",
                success: false
            })
        }
        return res.status(200).json({
            businesses,
            success:true    
        })
    } catch (error) {
        console.log(error);
    }
}

export const getBusinessById = async (req,res) => {
    try {
        const businessId = req.params.id
        const business = await Business.findById(businessId);
        if(!business){
            return res.status(404).json({
                message:"Businesses not found :(",
                success: false
            })
        }

        return res.status(200).json({
            business,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateBusiness = async (req,res) => {
    try {
        const {name,description,website,location} = req.body;
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name,description,website,location,logo};

        const business = await Business.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!business){
            return res.status(404).json({
                message:"Business not found :(",
                success:false
            })
        }

        return res.status(200).json({
            message: "Business information updated.",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}