import mongoose from "mongoose";

export default mongoose.model("Transcript",
 new mongoose.Schema({
  text:String,
  createdAt:{type:Date,default:Date.now}
 })
);