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
      const comments = await MovieModel.findOne({ label: label_ani }, 'comments').populate({ path: 'comments', populate: { path: 'userId', select: 'type avatar name' }, options: { sort: { 'createAt': -1 } } }).exec();
      // console.log(comments)
      res.status(301).json({ message: "SUCCESSFUL!", comments: comments.comments });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
  async getComment(req, res, next) {
    try {
      const { id_comment } = req.params;
      const comment = await CommentModel.findById(id_comment, 'replys').populate({ path: 'replys', populate: { path: 'userId', select: 'type avatar name' } }).exec();
      // console.log(comment)
      res.status(301).json({ message: "SUCCESSFUL!", comments: comment.replys });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
  async getLikeOfComment(req, res, next) {
    try {
      const { id_comment } = req.params;
      const context = await CommentModel.findById(id_comment, 'like').exec();
      res.status(301).json({ message: "SUCCESSFUL!", likeTotal: context.like.length });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
  async getMoviesByRange(req, res, next) {
    try {
      const { page, range } = req.query;
      const skip = parseInt(page) * parseInt(range);
      const limit = parseInt(range);
      const movies = await MovieModel.find()
        .skip(skip)
        .limit(limit)
        .populate("videos");
      res.status(301).json({ message: "SUCCESSFUL!", movies });
    } catch (error) {}
  }
  async getLengthMovies(req, res, next) {
    try {
      const length = await MovieModel.count({});
      res.status(301).json({ message: "SUCCESSFUL!", length });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
  async searchAnime(req, res, next) {
    try {
      let { keys, limit } = req.query;
      let lookMovie;
      keys = keys ? keys : null;
      if(keys == null) { lookMovie = [] }
      else {
        lookMovie = await MovieModel.find({ name: { $regex: keys, $options: 'i' } }, 'name desc label image').limit(limit || 5).exec();
      }
      res.status(301).json({ message: "SUCCESSFUL!", lookMovie });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default new WorkPublic();
