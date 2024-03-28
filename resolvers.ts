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
  },
  Mutation:{
    //dinh nghia ra ham them, sua, xoa bai viet:
    createArticle: async (_, args)=>{
            // console.log(args);
            const { article } = args;
            
            const record = new Article(article);
            await record.save(); //luu lai ban ghi

            return record;
    }
  }
}