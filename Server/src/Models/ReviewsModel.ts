import mongoose, { models } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    addressed_to: { type: String },
    addressed_by: { type: String },
    rating: { type: Number },
    Review: { type: String },
  },
  { timestamps: true }
);

const Review = models.reviewData || mongoose.model("reviewData", reviewSchema);
export default Review;
