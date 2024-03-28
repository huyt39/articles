import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";
import {ApolloServer, gql} from "apollo-server-express";

import Article from "./models/article.model";
import { graphql } from "graphql";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";



const startServer = async () => {
  dotenv.config();
  connectDatabase();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;
  
  // GraphQL API
  //dinh nghia ra truong ma FE duoc phep truy cap vao de lay data
  // const typeDefs = gql`
  //   type Query {
  //     hello: String 
  //   }
  // `;
  
  // const resolvers = {
  //   Query: {
  //     hello: () => { //ham co nhiem vu tra ra 1 chuoi
  //       return "Hello world";
  //     }
  //   }
  
  // }
  
  //khoi tao apollo sv:
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  await apolloServer.start(); //khoi chay apollo sv roi dinh nghia ra duong link api
  
  apolloServer.applyMiddleware({
    app: app,           //app cua chung ta
    path: "/graphql"  //duong link api
  })
  
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
startServer();