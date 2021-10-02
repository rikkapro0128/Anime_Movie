import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create Schema
const comment = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  label_ani: { type: String, required: true },
  like: { type: Number, default: 0 },
  heart: { type: Number, default: 0 },
  type: { type: String, default: "user", enum: ["user", "admin"] },
  content: { type: String, default: "" },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

// create models
const CommentModel = mongoose.model("comment", comment);

export { CommentModel };
