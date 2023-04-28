import express from "express";
import * as behavior from "../controllers/behavior_controllor.js";

const router = express.Router();

router.route('/').post(behavior.setBehaviorLog);

export default router;
