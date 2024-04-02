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
exports.resolversUser = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_helper_1 = require("../helpers/generate.helper");
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.tokenVerify) {
                const infoUser = yield user_model_1.default.findOne({
                    token: context.tokenVerify,
                    deleted: false
                });
                if (!infoUser) {
                    return {
                        code: 400,
                        message: "User không tồn tại!"
                    };
                }
                else {
                    return {
                        code: 200,
                        message: "Thành công!",
                        id: infoUser.id,
                        fullName: infoUser.fullName,
                        email: infoUser.email,
                        token: infoUser.token,
                    };
                }
            }
            else {
                return {
                    code: 400,
                    message: "Không có quyền truy cập!"
                };
            }
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (emailExist) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                user.token = (0, generate_helper_1.generateRandomString)(30);
                const newUser = new user_model_1.default(user);
                yield newUser.save();
                return {
                    code: 200,
                    message: "Thành công!",
                    id: newUser.id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    token: newUser.token
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const infoUser = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Email không tồn tại!"
                };
            }
            if ((0, md5_1.default)(user.password) !== infoUser.password) {
                return {
                    code: 400,
                    message: "Sai mật khẩu!"
                };
            }
            return {
                code: 200,
                message: "Thành công!",
                id: infoUser.id,
                email: infoUser.email,
                fullName: infoUser.fullName,
                token: infoUser.token
            };
        })
    }
};
