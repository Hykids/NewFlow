import { ArticleModel } from "../models/article.js";
// import { crawler_rmrb } from "../until/crawler.js";

const createArticle = async (req,res,next)=>{
    try {
      
        const { title,content, tags } = req.body;
        const article = new ArticleModel({
          title,
          content,
          tags,
        });
        await article.save();
        res.status(201).send(article);
      } catch (err) {
        res.status(400).send(err.message);
      }
};


const getAllArticle = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const count = await ArticleModel.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const articles = await ArticleModel.find().sort({createdAt: -1}).skip(skip).limit(limit);
    res.status(200).send({
      articles,
      totalPages
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//获取热度前十
const getTopArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find().sort({ viewsCount: -1 }).limit(10);
    const topArticles = articles.map(article => {
      return {
        id: article._id,
        title: article.title
      };
    });
    res.status(200).send(topArticles);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const likeArticle = async (req,res,next)=>{
  try {
    const { id: articleId  } = req.params;
    const { userId: userId } = req.body;

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).send('Article not found');
    }

    const index = article.likes.indexOf(userId);
    if (index !== -1) {
      // 如果用户已经点赞，那么取消点赞
      article.likes.splice(index, 1);
      article.likesCount--;
    } else {
      // 否则，新增点赞
      article.likes.push(userId);
      article.likesCount++;
    }

    await article.save();
    res.status(200).send(article);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
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


const getArticleContent = async (req, res,next)=>{
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

const deleteArticle = async (req, res)=>{  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.status(200).send('Article deleted successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }};


export {
    getAllArticle,
    updateArticle,
    deleteArticle,
    createArticle,
    likeArticle,
    getArticleContent,
    getTopArticles
}