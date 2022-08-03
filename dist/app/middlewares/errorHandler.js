"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, req, res, next) => {
    console.log('Error Handler', error);
    res.sendStatus(500);
};
