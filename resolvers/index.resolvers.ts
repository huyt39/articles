import { resolversArticle } from "./article.resolvers";
import { resolversCategory } from "./category.resolvers";
import { resolversUser } from "./user.resolvers";

export const resolvers = [
    resolversArticle, 
    resolversCategory,
    resolversUser
];