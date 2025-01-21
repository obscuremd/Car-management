import mongoose, { models } from "mongoose";

const secretarySchema = new mongoose.Schema({
  password: { type: String },
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_number: { type: String },
  sex: { type: String },
  NIN: { type: String },
  branch: { type: String },
});

const Secretary =
  models.secretaryData || mongoose.model("secretaryData", secretarySchema);
export default Secretary;
