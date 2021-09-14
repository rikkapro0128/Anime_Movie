import express from 'express';
const router = express.Router();
// import controller
import CommonMovie from '../../controller/CommonMovie.js';

router.get('/ls', CommonMovie.getMovies);
router.get('/:label/options', CommonMovie.getMovieByLabel);

export default router;
