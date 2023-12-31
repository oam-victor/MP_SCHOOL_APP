import mongoose from "mongoose";
const {Schema} = mongoose;

const employeeSchema =  new Schema(
    {
        name: {type: String, required: true},
        email: {type: String},
        position: {type: String},
        department: {type: String},
        salary: {type: Number},
        manager: {type: String},
        phone: {type:Number} 
    },
    {
        timestamps: true
    }
)

export const Employee = mongoose.model("Employee", employeeSchema);