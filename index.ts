import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";

import Article from "./models/article.model";

dotenv.config();
connectDatabase();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Rest API
app.get("/articles", async (req: Request, res: Response) => {
  const articles = await Article.find({
    deleted: false //lay ra bai viet chua bi xoa
  })
  res.json({
    articles: articles //tra ra giao dien cac bai viet
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});