import mongoose, { models } from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String },
  admins_status: { type: Boolean },
  password: { type: String },
});

const Admin = models.adminData || mongoose.model("adminData", adminSchema);
export default Admin;
