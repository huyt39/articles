//typeDefs de dinh nghia ten bien cho FE truy cap vao
import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category
  }

  
  type Query {
    getListArticle(
      sortKey: String,
      sortValue: String
    ): [Article],
  }

  input ArticleInput {
    title: String,
    avatar: String,
    description: String,
    categoryId: String 
  }

 

  type Mutation{
    createArticle(article: ArticleInput): Article ,
    deleteArticle(id: ID): String,
    updateArticle(id: ID, article: ArticleInput): Article,
  }
`;