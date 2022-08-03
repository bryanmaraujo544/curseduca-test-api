"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
class LikesRepository {
    async findAll() {
        const likes = await prisma_1.default.like.findMany({});
        return likes;
    }
    async create({ postId, userId }) {
        const like = await prisma_1.default.like.create({
            data: {
                postId: Number(postId),
                authorId: userId,
            },
        });
        return like;
    }
    async delete({ postId, userId }) {
        try {
            await prisma_1.default.like.deleteMany({
                where: {
                    AND: [
                        {
                            authorId: userId,
                        },
                        {
                            postId,
                        },
                    ],
                },
            });
            return;
        }
        catch (_a) {
            return;
        }
    }
    async findByUserIdAndPostId({ postId, userId }) {
        const like = await prisma_1.default.like.findFirst({
            where: {
                AND: [
                    {
                        authorId: Number(userId),
                    },
                    {
                        postId: Number(postId),
                    },
                ],
            },
        });
        return like;
    }
}
exports.default = new LikesRepository();
