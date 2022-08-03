"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
class UsersRepository {
    async findAll() {
        const users = await prisma_1.default.user.findMany({});
        return users;
    }
    async create({ name, email, password, profileImg }) {
        const user = await prisma_1.default.user.create({
            data: {
                email,
                name,
                password,
                profileImg,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email,
            },
        });
        return user;
    }
    async findById(id) {
        try {
            const user = await prisma_1.default.user.findFirst({
                where: {
                    id: Number(id),
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profileImg: true,
                },
            });
            return user;
        }
        catch (_a) {
            return null;
        }
    }
}
exports.default = new UsersRepository();
