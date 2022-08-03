"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureAuthentication = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }
    const token = authorization.split(' ')[1];
    try {
        const tokenDecoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (tokenDecoded) {
            req.userId = tokenDecoded.id;
            next();
        }
        else {
            return res.sendStatus(401);
        }
    }
    catch (_a) {
        return res.sendStatus(401);
    }
};
exports.ensureAuthentication = ensureAuthentication;
