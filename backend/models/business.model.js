import mongoose, { Mongoose } from "mongoose";

const businessSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    website:{
        type: String,
    },
    location:{
        type: String,
    },
    logo:{
        type: String //Url logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
},{timestamps:true})

export const Business = mongoose.model("Business", businessSchema);