import mongoose from 'mongoose'

const { Schema } = mongoose

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    age: { type: Number, required: true },
    phone_number: { type: Number, required: true },
    class_: { type: Number },
    grades: [{type: Number}],
    profile: { type: String },
  },
  { timestamps: true },
)

export const Student = mongoose.model("Student", studentSchema);