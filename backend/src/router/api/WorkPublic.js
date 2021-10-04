import express from "express";
const router = express.Router();
// import controller
import WorkPublic from "../../controller/WorkPublic.js";

router.get("/take-mv/ls", WorkPublic.getMovies);
router.get("/take-length-movies", WorkPublic.getLengthMovies);
router.get("/take-movie/range", WorkPublic.getMoviesByRange);
router.get("/take-mv/:label/options", WorkPublic.getMovieByLabel);
router.get("/take-comment/:label_ani", WorkPublic.getCommentByLabel);

export default router;
