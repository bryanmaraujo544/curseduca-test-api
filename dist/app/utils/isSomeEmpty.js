"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSomeEmpty = void 0;
const isSomeEmpty = (values) => {
    const someIsNull = values.some((value) => {
        if (!value && value !== 0) {
            return true;
        }
        return false;
    });
    return someIsNull;
};
exports.isSomeEmpty = isSomeEmpty;
