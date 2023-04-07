import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";
import menuRouter from "./routes/menu.js"

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
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/menulist", menuRouter);

const startServer = async () =>{
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(9000,()=>console.log('server started on port http://localhost:9000'))
  } catch (error) {
    console.log(error)
  }
}

startServer();
