import { ArticleModel } from "../models/article.js";

const createArticle = async (res,req)=>{
    try {
        const { title, author, content, photo, tags } = req.body;
        const article = new ArticleModel({
          title,
          author,
          content,
          photo,
          tags
        });
        await article.save();
        res.status(201).send(article);
      } catch (err) {
        res.status(400).send(err.message);
      }
};
const getAllArticle = async (res,req)=>{
    try {
        const articles = await ArticleModel.find();
        res.status(200).send(articles);
      } catch (err) {
        res.status(400).send(err.message);
      }
};
const updateArticle = async (res,req)=>{
    try {
        const { title, content, photo, tags } = req.body;
        const article = await ArticleModel.findByIdAndUpdate(
          req.params.id,
          { title, content, photo, tags },
          { new: true }
        );
        if (!article) {
          return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
      } catch (err) {
        res.status(400).send(err.message);
      }
};

const getArticleContent = async (res,req)=>{
    try {
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
          return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
      } catch (err) {
        res.status(400).send(err.message);
      }
};

const deleteArticle = async (res,req)=>{  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.status(200).send('Article deleted successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }};


const likedArticle = async(res,req) => {
    try {
        const user = req.user; // 假设已经验证了用户身份，获取到了用户信息
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
          return res.status(404).send('Article not found');
        }
        if (article.likes.includes(user._id)) {
          return res.status(400).send('You have already liked this article');
        }
        article.likes.push(user._id);
        await article.save();
        res.status(200).send('Article liked successfully');
      } catch (err) {
        res.status(400).send(err.message);
      }
}

export {
    getAllArticle,
    updateArticle,
    deleteArticle,
    createArticle,
    likedArticle,
    getArticleContent
}