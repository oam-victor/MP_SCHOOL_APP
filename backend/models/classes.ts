import mongoose from "mongoose";
const {Schema} = mongoose;

const classesSchema = new Schema(
    {
        name: {type: Number, required: true},
        students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
        teacher: String,
    },
    {
        timestamps: true
    }
)

export const Class = mongoose.model('Class', classesSchema);