import mongoose from "mongoose";
const {Schema} = mongoose;

const expensesSchema = new Schema(
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

export const Expense = mongoose.model('Expense', expensesSchema);