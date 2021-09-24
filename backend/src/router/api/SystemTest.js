import express from 'express';
const router = express.Router();
// import controller
import SystemTest from '../../controller/SystemTest.js';

router.post('/upload-image', SystemTest.uploadImage);

export default router;
