"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsRepository_1 = __importDefault(require("../repositories/PostsRepository"));
class PostController {
    async index(req, res) {
        const posts = await PostsRepository_1.default.findAll();
        res.send(posts);
    }
    async store(req, res) {
        const { userId } = req;
        const { content } = req.body;
        if (!content) {
            return res
                .status(400)
                .json({ post: null, message: 'Some fields are missing.' });
        }
        const post = await PostsRepository_1.default.create({ userId, content });
        res.json({ message: 'Post created.', post });
    }
    async update(req, res) {
        const { id } = req.params;
        const { content } = req.body;
        if (!content) {
            return res
                .status(400)
                .json({ post: null, message: 'Some fields are missing.' });
        }
        const newPost = await PostsRepository_1.default.update({ id: Number(id), content });
        res.json({ message: 'Post updated.', post: newPost });
    }
    async delete(req, res) {
        const { id } = req.params;
        await PostsRepository_1.default.delete(Number(id));
        res.sendStatus(200);
    }
}
exports.default = new PostController();
