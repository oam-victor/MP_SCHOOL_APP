import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema =  new Schema(
    {
        position: {type: 'String', required: true},
        name: {type: 'String', required: true}
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("Grades", userSchema);