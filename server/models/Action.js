import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema({
  task: String,
  owner: String,
  dueDate: String,
  done: { type: Boolean, default: false },
  transcriptId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Action", ActionSchema);