import express from "express";
import { addTagToUser,getAllTags } from "../controllers/tag_controller.js";

const router = express.Router();

router.route('/').post(addTagToUser);
router.route('/').get(getAllTags);

export default router;
