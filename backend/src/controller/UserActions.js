import { CommentModel } from "../model/comment.js";
import helper from "../utils/sign.js";
class User {
  async ActiveComment(req, res, next) {
    try {
      const { comment, label_ani } = req.body;
      const state = await helper.verifyToken(req.get("Authorization"));
      const newComment = new CommentModel({
        userId: state._id,
        name: state.name,
        label_ani,
        content: comment,
        type: state.type,
      });
      await newComment.save();
      res.status(301).json({ message: "SUCCESSFUL!" });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default new User();
