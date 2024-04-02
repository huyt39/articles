"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_resolvers_1 = require("./article.resolvers");
const category_resolvers_1 = require("./category.resolvers");
const user_resolvers_1 = require("./user.resolvers");
exports.resolvers = [
    article_resolvers_1.resolversArticle,
    category_resolvers_1.resolversCategory,
    user_resolvers_1.resolversUser
];
