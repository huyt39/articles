//resolvers de giai quyet van de
import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false
      });

      return articles;
    }
  }
}