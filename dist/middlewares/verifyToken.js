"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJwt = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) ||
            req.body.token;
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`invalid token ${err}`);
    }
};
exports.verifyJwt = verifyJwt;
