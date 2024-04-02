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
exports.resolversCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
exports.resolversCategory = {
    Query: {
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find({
                deleted: false
            });
            return categories;
        })
    },
    Mutation: {
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const record = new category_model_1.default(category);
            yield record.save();
            return record;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield category_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Đã xoá!";
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            yield category_model_1.default.updateOne({
                _id: id
            }, category);
            const newData = yield category_model_1.default.findOne({
                _id: id
            });
            return newData;
        }),
    }
};
