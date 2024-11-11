import { Businessinfo } from "../models/businessinfo.model.js";

export const postBusinessinfo = async (req, res) => {
    try {
        const { title, description, requirements, amount, location, investorType, investors, businessId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !amount || !location || !investorType  || !investors || !businessId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const businessinfo = await Businessinfo.create({
            title,
            description,
            requirements: requirements.split(","),
            amount: Number(amount),
            location,
            investorType,
            investors,
            business: businessId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New Business created successfully.",
            businessinfo,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllBusinessinfos = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        
        const businessinfos = await Businessinfo.find(query).populate({
            path: "business"
        }).sort({ createdAt: -1 });
        
        if (!businessinfos) {
            return res.status(404).json({
                message: "No businesses found.",
                success: false
            });
        }
        
        return res.status(200).json({
            businessinfos,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getBusinessinfoById = async (req, res) => {
    try {
        const businessinfoId = req.params.id;
        const businessinfo = await Businessinfo.findById(businessinfoId).populate({
            path:"applications"
        });
        
        if (!businessinfo) {
            return res.status(404).json({
                message: "Business not found :(",
                success: false
            });
        }
        
        return res.status(200).json({ businessinfo, success: true });
    } catch (error) {
        console.error(error);
    }
}

//admin
export const getAdminbusinessinfos = async (req, res) => {
    try {
        const adminId = req.id;
        const businessinfos = await Businessinfo.find({ created_by: adminId }).populate({
            path:'business',
            createdAt:-1
        });
        
        
        if (businessinfos.length === 0) {
            return res.status(404).json({
                message: "No businesses found for this admin.",
                success: false
            });
        }
        
        return res.status(200).json({
            businessinfos,
            success: true
        });
    } catch (error) {
        console.error(error);
    }
}

