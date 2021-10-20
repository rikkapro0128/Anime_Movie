import express from 'express';
const router = express.Router();
// import controller
import SystemSign from '../../controller/SystemSign.js';
// import helper Sign
import helpSign from '../../utils/sign.js';
import passport from "passport";
// import config passport 
import passportConfig from '../../utils/passport.js';

router.get("/auth/facebook", passport.authenticate('facebook-token', { session: false }), SystemSign.loginFacebook);
router.post('/act-up', helpSign.checkData, SystemSign.signUp);
router.post('/act-in', helpSign.checkData, SystemSign.signIn);
router.post('/act-out', SystemSign.signOut);
router.post('/ref-token', SystemSign.refToken);

export default router;
