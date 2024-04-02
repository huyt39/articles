"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    mongoose_1.default.connect(process.env.MONGO_URL)
        .then(() => console.log('Connected!'));
};
exports.connect = connect;
