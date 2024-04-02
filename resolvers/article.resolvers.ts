//resolvers de giai quyet van de
import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  Query: {
    
    getListArticle: async (_,args) => {
      const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue } = args;
      const find={
        deleted: false
      };
// Sort
      const sort = {};
      if (sortKey && sortValue){
        sort[sortKey] = sortValue;
      }
// End sort

// Pagination
      const skip = (currentPage - 1)*limitItems;
// End pagination

//Filter
      if(filterKey && filterValue){
        find[filterKey] = filterValue;
      }
// End Filter


      const articles = await Article.find(find)
      .sort(sort)
      .limit(limitItems)
      .skip(skip);

      return articles;
    }
  },
  Article:{
    //viet logic cho phan category, tra ve 1 object:
    category: async (article) => {
      // console.log(article);
      const { categoryId } = article; //lay ra id cua bai viet dang lap den
      const category = await Category.findOne({
        _id: categoryId
      })
      return category; //return den object nay thi lay object nay gan cho bien
      //category o trong type Article cua file typeDefs
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
    }

    
  }
}