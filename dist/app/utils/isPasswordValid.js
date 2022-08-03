"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordValid = void 0;
const isPasswordValid = (str) => {
    const regex = /(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return regex.test(str);
};
exports.isPasswordValid = isPasswordValid;
