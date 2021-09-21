import express from 'express';
const router = express.Router();
// import controller
import User from '../../controller/UserActions.js';

router.get('/test', User.test);

export default router;
