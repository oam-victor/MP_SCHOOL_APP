import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema =  new Schema(
    {
        uid: {type: 'String', required: false},
        name: {type: 'String', required: true},
        email: {type: 'String', required: true},
        password: {type: 'String', required: true},
        photoURL: {type: 'String', required: true},
        permission: {type: 'String', required: true}
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);