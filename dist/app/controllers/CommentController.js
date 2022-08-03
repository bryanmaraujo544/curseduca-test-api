"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentsRepository_1 = __importDefault(require("../repositories/CommentsRepository"));
class CommentController {
    async index(req, res) {
        const comments = await CommentsRepository_1.default.findAll();
        res.send(comments);
    }
    async store(req, res) {
        const { userId } = req;
        const { postId, content } = req.body;
        if (!postId || !content) {
            return res
                .status(400)
                .json({ message: 'Some fields are missing.', comment: null });
        }
        const comment = await CommentsRepository_1.default.create({
            userId,
            postId,
            content,
        });
        res.json({ message: 'Comment created', comment });
    }
    async delete(req, res) {
        const { id } = req.params;
        await CommentsRepository_1.default.delete(Number(id));
        res.sendStatus(200);
    }
}
exports.default = new CommentController();
