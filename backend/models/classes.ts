import mongoose from "mongoose";
const {Schema} = mongoose;

const classesSchema = new Schema(
    {
        name: {type: String, required: true},
        students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
        teacher: {type: Schema.Types.ObjectId, ref: 'Employee'},
    },
    {
        timestamps: true
    }
)

export const Class = mongoose.model('Class', classesSchema);