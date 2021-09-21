import express from 'express';
const router = express.Router();
// import controller
import WorkMovie from '../../controller/WorkMovie.js';

router.get('/ls', WorkMovie.getMovies);
router.get('/:label/options', WorkMovie.getMovieByLabel);

export default router;
