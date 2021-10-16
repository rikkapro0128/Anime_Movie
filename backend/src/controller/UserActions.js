import { CommentModel, } from "../model/comment.js";
import { MovieModel, } from "../model/movie.js";
import helper from "../utils/sign.js";
class User {
  async createComment(req, res, next) {
    try {
      const { comment, label_ani } = req.body;
      const state = await helper.verifyToken(req.get("Authorization"));
      const Movie = await MovieModel.findOne({ label: label_ani }).exec();
      const newComment = new CommentModel({
        userId: state._id,
        name: state.name,
        label_ani,
        content: comment,
        type: state.type,
      });
      Movie.comments.push({ _id: newComment._id });
      await newComment.save();
      await Movie.save();
      res.status(301).json({ message: "SUCCESSFUL!" });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
  async replyComment(req, res, next) {
    const state = await helper.verifyToken(req.get("Authorization"));
    const { id_comment, content_reply } = req.body;
    const comment = await CommentModel.findById(id_comment).exec();
    if(comment) {
      const newReply = new CommentModel({
        userId: state._id,
        name: state.name,
        label_ani: comment.label_ani,
        content: content_reply,
        type: state.type,
      });
      comment.replys.push({ _id: newReply._id });
      await newReply.save();
      await comment.save();
    }
    res.status(301).json({ message: "SUCCESSFUL!" });
  }
  async likeComment(req, res, next) {
    try {
      const { id_comment } = req.params;
      const state = await helper.verifyToken(req.get("Authorization"));
      const isLiked = await CommentModel.findOne({ _id: id_comment, like: { $eq: state._id } }, 'like').exec();
      if(isLiked) {
        await CommentModel.updateOne({ _id: id_comment }, { $pull: { like: { $eq: state._id } } }).exec();
      }else {
        const like = await CommentModel.findOne({ _id: id_comment }, 'like').exec();
        like.like.push({ _id: state._id });
        await like.save();
      }
      res.status(301).json({ message: "SUCCESSFUL!" })
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default new User();
