import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cron from 'node-cron';
import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";
import behaviorRouter from "./routes/behavior.routes.js";
import recommendationRouter from './routes/recommendation.routes.js'
import menuRouter from "./routes/menu.js"
import loginRouter from "./routes/login.js"
import tagRouter from './routes/tag.routes.js'
import {crawler_rmrb} from "./until/crawler.js"
// import { ArticleModel } from "./models/article.js";
// import { BehaviorLogModel } from "./models/behavior_log.js";

import connectDB from "./mongoose/connect.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/", loginRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/menulist", menuRouter);
app.use("/api/v1/behavior", behaviorRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/recommendation", recommendationRouter);

app.get('/api/v1/auth/buttons', (req, res,next) => {
  const useHooks = {
    add: true,
    delete: true
  };

  res.json({ useHooks });
});


const startServer = async () =>{
  try {
    await connectDB(process.env.MONGO_URL);
    // 清空 ArticleModel 模块中的数据集
    // await ArticleModel.deleteMany({});
    // await BehaviorLogModel.deleteMany({})
    app.listen(9000,()=>console.log('server started on port http://localhost:9000'))
    // 每日八点定时爬取
    // crawler_rmrb();
    cron.schedule('0 8 * * *', () => {
      crawler_rmrb();
    });
  } catch (error) {
    console.log(error)
  }
}

startServer();
