//typeDefs de dinh nghia ten bien cho FE truy cap vao
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category
  }

  type Category{
    id: ID,
    title: String,
    avatar: String
  }
  type Query {
    hello: String,
    getListArticle: [Article]
    getListCategory: [Category]
  }

  input ArticleInput {
    title: String,
    avatar: String,
    description: String
  }

  input CategoryInput{
    title: String,
    avatar: String
  }

  type Mutation{
    createArticle(article: ArticleInput): Article ,
    deleteArticle(id: ID): String,
    updateArticle(id: ID, article: ArticleInput): Article,

    createCategory(category: CategoryInput): Category,
    deleteCategory(id: ID): String,
    updateCategory(id: ID, category: CategoryInput): Category,

  }
`;