"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (fields) => {
    const token = jsonwebtoken_1.default.sign(Object.assign({}, fields), process.env.SECRET_KEY);
    return token;
};
exports.createToken = createToken;
