"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
class CommentsRepository {
    async findAll() {
        const comments = await prisma_1.default.comment.findMany({});
        return comments;
    }
    async create({ content, postId, userId }) {
        const comment = await prisma_1.default.comment.create({
            data: {
                content,
                authorId: Number(userId),
                postId: Number(postId),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        profileImg: true,
                    },
                },
            },
        });
        return comment;
    }
    async delete(id) {
        try {
            await prisma_1.default.comment.delete({
                where: {
                    id: Number(id),
                },
            });
        }
        catch (_a) {
            return;
        }
        return;
    }
}
exports.default = new CommentsRepository();
