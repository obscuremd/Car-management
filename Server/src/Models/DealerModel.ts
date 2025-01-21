import mongoose, { models } from "mongoose";

const dealerSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_number: { type: String },
  sex: { type: String },
  NIN: { type: String },
  branch: { type: String },
});

const Dealer = models.dealerData || mongoose.model("dealerData", dealerSchema);
export default Dealer;
