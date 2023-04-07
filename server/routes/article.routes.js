import express from "express";
import * as article from "../controllers/article_controller.js";

const router = express.Router();

router.route('/').get(article.getAllArticle);
router.route('/:id').get(article.getArticleContent);
router.route('/').post(article.createArticle);
router.route('/:id').patch(article.updateArticle);
router.route('/:id').delete(article.deleteArticle);
router.route('/:id/likes').post(article.likedArticle)

export default router;
