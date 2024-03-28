//typeDefs de dinh nghia ten bien cho FE truy cap vao
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  type Query {
    hello: String,
    getListArticle: [Article]
  }
`;