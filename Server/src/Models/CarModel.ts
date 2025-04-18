import mongoose, { models } from "mongoose";

const carSchema = new mongoose.Schema(
  {
    dealer: { type: String },
    vehicle_type: { type: String },
    chases_no: { type: String },
    vehicle_color: { type: String },
    vehicle_color_hex_code: { type: String },
    date_in: { type: String },
    date_out: { type: String },
    status: { type: String },
    branch: { type: String },
  },
  { timestamps: true }
);

const Car = models.carData || mongoose.model("carData", carSchema);
export default Car;
