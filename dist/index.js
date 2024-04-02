"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const apollo_server_express_1 = require("apollo-server-express");
const index_typeDefs_1 = require("./typeDefs/index.typeDefs");
const index_resolvers_1 = require("./resolvers/index.resolvers");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    (0, database_1.connect)();
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3000;
    app.use("/graphql", auth_middleware_1.requireAuth);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: index_typeDefs_1.typeDefs,
        resolvers: index_resolvers_1.resolvers,
        introspection: true,
        context: ({ req }) => {
            return Object.assign({}, req);
        }
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
startServer();
