import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create Schema

const comment = new Schema({
  userId: { type: Schema.Types.ObjectId , ref: 'account' },
  name: { type: String, required: true },
  label_ani: { type: String, },
  like: [{ type: Schema.Types.ObjectId , ref: 'account' }],
  heart: [{ type: Schema.Types.ObjectId , ref: 'account' }],
  type: { type: String, default: "user", enum: ["user", "admin"] },
  content: { type: String, default: "" },
  replys: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
},{ timestamps: true });


// create models
const CommentModel = mongoose.model("comment", comment);

export { CommentModel, };
