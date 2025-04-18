import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profile_picture: { type: String },
    login_id: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "secretary", "dealer"],
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String },
    sex: { type: String, enum: ["Male", "Female", "Other"] },
    NIN: { type: String },
    branch: { type: String },
  },
  { timestamps: true }
);

const User = models.userData || mongoose.model("userData", userSchema);
export default User;
