//resolvers de giai quyet van de
import Article from "./models/article.model";
import Category from "./models/category.model";

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
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false
      });

      return categories;
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
    },
    deleteArticle: async (_,args)=>{
      const { id } = args;
      // console.log(id);
      await Article.updateOne({
        _id: id
      },{
        deleted: true,
        deletedAt: new Date()
      });

      return "Đã xoá!";
    },
    updateArticle: async (_, args) => {
      // console.log(args);
      const { id, article } = args;
      await Article.updateOne({      //update trong db
        _id: id   
      }, article);

      const newData = await Article.findOne({  //lay ban ghi do trong db
        _id: id
      });

      return newData;  //tra ra object
    },

    createCategory: async (_, args)=>{
      // console.log(args);
      const { category} = args;
      
      const record = new Category(category);
      await record.save(); //luu lai ban ghi

      return record;
},
deleteCategory: async (_,args)=>{
  const { id } = args;
  // console.log(id);
  await Category.updateOne({
    _id: id
  },{
    deleted: true,
    deletedAt: new Date()
  });

  return "Đã xoá!";
},
updateCategory: async (_, args) => {
  // console.log(args);
  const { id, category } = args;
  await Category.updateOne({      //update trong db
    _id: id   
  }, category);

  const newData = await Category.findOne({  //lay ban ghi do trong db
    _id: id
  });

  return newData;  //tra ra object
},
  }
}