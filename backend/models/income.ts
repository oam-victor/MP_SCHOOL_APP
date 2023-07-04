import mongoose from "mongoose";
const {Schema} = mongoose;

const incomeSchema = new Schema(
    {
        name: {type: String},
        type: {type: String},
        cost: {type: Number},
        paid_on: {type: Date} 
    },
    {
        timestamps: true
    }
)

export const Income = mongoose.model("Income", incomeSchema);