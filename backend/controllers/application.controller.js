import { Application } from "../models/application.model.js";
import { Businessinfo } from "../models/businessinfo.model.js";
import { User } from "../models/user.model.js";

export const applyBusiness = async (req,res) => {
    try {
        const userId = req.id;
        const businessinfoId = req.params.id;  
        if(!businessinfoId){
            return res.status(400).json({
                message:"Bussiness id is Required.",
                success:"false"
            })
        };
        // check user is already applied
        const existingApplication = await Application.findOne({businessinfo:businessinfoId, applicant:userId });

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this business",
                success:false
            });
        }

        // check is business is exists
        const businessinfo = await Businessinfo.findById(businessinfoId);
        if (!businessinfo) {
            return res.status(404).json({
                message: "Business not found :(",
                success: false
            })
        }

        // create a new application
        const newApplication = await Application.create({
            businessinfo:businessinfoId,
            applicant:userId,
        });

        businessinfo.applications.push(newApplication._id);
        await businessinfo.save();
        return res.status(201).json({
            message:"Business applied successfully.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
};
export const getAppliedBusinessinfos = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'businessinfo',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'business',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// Investors list for admin
export const getApplicants = async (req,res) => {
    try {
        const businessinfoId = req.params.id;
        const businessinfo = await Businessinfo.findById(businessinfoId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!businessinfo){
            return res.status(404).json({
                message:'Business not found :(',
                success:false
            })
        };
        return res.status(200).json({
            businessinfo, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found :(",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
} 