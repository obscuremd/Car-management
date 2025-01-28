import mongoose, { models } from "mongoose";

const boySchema = new mongoose.Schema(
  {
    profile_picture: { type: String },
    dealer: { type: String },
    name: { type: String },
    address: { type: String },
    email: { type: String },
    phone_number: { type: String },
    sex: { type: String },
    NIN: { type: String },
  },
  { timestamps: true }
);

const Boy = models.boyData || mongoose.model("boyData", boySchema);
export default Boy;
