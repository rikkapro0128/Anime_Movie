import express from "express";
const router = express.Router();
// import controller
import User from "../../controller/UserActions.js";

router.post("/active-comment", User.ActiveComment);

export default router;
