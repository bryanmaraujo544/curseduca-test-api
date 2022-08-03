"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
const isSomeEmpty_1 = require("../utils/isSomeEmpty");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../utils/createToken");
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        if ((0, isSomeEmpty_1.isSomeEmpty)([email, password])) {
            return res
                .status(400)
                .json({ message: 'Some fields are missing.', token: null });
        }
        const userByEmail = await UsersRepository_1.default.findByEmail(email);
        if (!userByEmail) {
            return res
                .status(403)
                .json({ message: 'The user does not exists.', token: null });
        }
        const hashedPassword = userByEmail.password;
        const isPasswordCorrect = await bcrypt_1.default.compare(password, hashedPassword);
        if (!isPasswordCorrect) {
            return res
                .status(403)
                .json({ message: 'There are wrong values.', token: null });
        }
        const token = (0, createToken_1.createToken)({ id: userByEmail.id });
        res.json({ message: 'User logged in', token });
    }
    async auth(req, res) {
        res.sendStatus(200);
    }
}
exports.default = new AuthController();
