import express from "express";
import { getRecommendation } from "../controllers/recommendation_controller.js";

const router = express.Router();

router.route('/:id').get(getRecommendation)

export default router;