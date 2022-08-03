"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const prisma_1 = __importDefault(require("../../prisma"));
class PostsRepository {
    async findAll() {
        const posts = await prisma_1.default.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        profileImg: true,
                    },
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                profileImg: true,
                            },
                        },
                    },
                },
                likes: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return posts;
    }
    async create({ userId, content }) {
        const post = await prisma_1.default.post.create({
            data: {
                authorId: Number(userId),
                content,
                createdAt: luxon_1.DateTime.local().setZone('UTC-3').toISO(),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        profileImg: true,
                    },
                },
                comments: true,
                likes: true,
            },
        });
        return post;
    }
    async update({ id, content }) {
        const post = await prisma_1.default.post.update({
            where: {
                id: Number(id),
            },
            data: {
                content,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        profileImg: true,
                    },
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                profileImg: true,
                            },
                        },
                    },
                },
                likes: true,
            },
        });
        return post;
    }
    async delete(id) {
        try {
            await prisma_1.default.post.delete({
                where: {
                    id: Number(id),
                },
            });
        }
        catch (_a) {
            return;
        }
    }
}
exports.default = new PostsRepository();
