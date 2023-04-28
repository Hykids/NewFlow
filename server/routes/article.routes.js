import express from "express";
import * as article from "../controllers/article_controller.js";

const router = express.Router();

router.route('/top-articles').get(article.getTopArticles);
router.route('/').get(article.getAllArticle);
router.route('/:id').patch(article.updateArticle);
router.route('/:id').get(article.getArticleContent);
router.route('/').post(article.createArticle);
router.route('/:id').delete(article.deleteArticle);
router.route('/:id/likes').post(article.likeArticle);

export default router;
