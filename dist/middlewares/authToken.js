"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authJwt = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) ||
            req.body.token;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.user.id != req.params.id) {
            throw new Error('you dont have premission to get this info');
        }
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`invalid token ${err}`);
    }
};
exports.authJwt = authJwt;
