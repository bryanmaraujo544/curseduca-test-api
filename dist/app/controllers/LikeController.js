"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikesRepository_1 = __importDefault(require("../repositories/LikesRepository"));
class LikeController {
    async index(req, res) {
        const likes = await LikesRepository_1.default.findAll();
        res.send(likes);
    }
    async store(req, res) {
        const { userId } = req;
        const { postId } = req.body;
        if (!postId) {
            return res
                .status(400)
                .json({ message: 'Some fields are missing.', like: null });
        }
        const userAlredyLikedPost = await LikesRepository_1.default.findByUserIdAndPostId({
            postId,
            userId,
        });
        if (userAlredyLikedPost) {
            return res.json({ message: 'Already liked', like: userAlredyLikedPost });
        }
        const like = await LikesRepository_1.default.create({
            userId: Number(userId),
            postId: Number(postId),
        });
        res.json({ message: 'Like created', like });
    }
    async delete(req, res) {
        const { userId } = req;
        const { postId } = req.params;
        await LikesRepository_1.default.delete({
            userId: Number(userId),
            postId: Number(postId),
        });
        res.sendStatus(200);
    }
}
exports.default = new LikeController();
