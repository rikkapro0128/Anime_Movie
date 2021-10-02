import { CommentModel } from "../model/comment.js";
import { MovieModel } from "../model/movie.js";
import helper from "../utils/sign.js";
class WorkPublic {
  async getMovies(req, res, next) {
    const Movie = await MovieModel.find({}).populate("videos").exec();
    res.status(301).json(Movie);
  }
  async getMovieByLabel(req, res, next) {
    const optionQuery = Object.keys(req.query);
    const label_ani = req.params.label;
    let Movie;
    if (!optionQuery.length) {
      Movie = await MovieModel.findOne({ label: label_ani }).exec();
    } else if (optionQuery.includes("esp")) {
      if (req.query.esp === "all") {
        Movie = await MovieModel.findOne({ label: label_ani })
          .populate("videos")
          .exec();
      } else if (typeof parseInt(req.query.esp)) {
        Movie = await MovieModel.findOne({ label: label_ani })
          .populate({ path: "videos", match: { esp: parseInt(req.query.esp) } })
          .exec();
      }
    }
    res.status(301).json(Movie);
  }
  async getCommentByLabel(req, res, next) {
    try {
      const { label_ani } = req.params;
      const comments = await CommentModel.find({ label_ani: label_ani });
      res.status(301).json({ message: "SUCCESSFUL!", comments });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default new WorkPublic();
