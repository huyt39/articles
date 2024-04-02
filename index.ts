import express, { Express} from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";
import {ApolloServer} from "apollo-server-express";
// import { typeDefs } from "./typeDefs";
// import { resolvers } from "./resolvers";
// import { typeDefsArticle } from "./typeDefs/article.typeDefs";
// import { typeDefsCategory } from "./typeDefs/catgory.typeDefs";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";


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

  app.use("/graphql", requireAuth); //doi voi route graphql luon cho chay qua middleware trung gian
  
  //khoi tao apollo sv:
  const apolloServer = new ApolloServer({
    // typeDefs  [typeDefsArticle, typeDefsCategory],
    typeDefs,
    resolvers,
    context: ({req})=>{    //nhan duoc req,res...
      return {...req};    //dau 3 cham de nhan ban object=>ben getUser cua resolvers nhan duoc context la req
    }
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