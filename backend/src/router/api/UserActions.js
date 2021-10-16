import express from "express";
const router = express.Router();
// import controller
import User from "../../controller/UserActions.js";

router.post("/create-comment", User.createComment);
router.post("/reply-comment", User.replyComment);
router.post("/like-comment/:id_comment", User.likeComment);

export default router;
