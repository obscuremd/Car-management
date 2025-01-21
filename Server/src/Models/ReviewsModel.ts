import mongoose, { models } from "mongoose";

const reviewSchema = new mongoose.Schema({
    passenger_id:{ type:String},
    Driver_id:{ type:String},
    Review:{ type:String}
});

const Review = models.reviewData || mongoose.model('reviewData', reviewSchema);
export default Review;
