import express from 'express';
const router = express.Router();
// import controller
import Admin from '../../controller/AdminActions.js';

router.get('/path-dir-upload', Admin.getPathDir);
router.post('/up-img-mv/options', Admin.imageMovie);
router.post('/update-movie/:label_ani/options', Admin.updateMovie);
router.post('/create-movie', Admin.createMovie);
router.post('/post-video', Admin.postVideoByLabel);
router.delete('/remove-video/:label_ani/options', Admin.removeVideoByLabel);
router.delete('/remove-movie/:label_ani/options', Admin.removeMovieByLabel);

export default router;
