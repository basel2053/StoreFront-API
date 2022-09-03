"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const verifyToken_1 = require("../middlewares/verifyToken");
const authToken_1 = require("../middlewares/authToken");
const signToken_1 = require("../utilities/signToken");
const store = new user_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        throw new Error(`couldn't get users, ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        throw new Error(`couldn't get user ${req.params.id}, ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        if (!user.firstname || !user.lastname || !user.password) {
            return res
                .status(422)
                .json('All fields are required firstname, lastname and password');
        }
        const createdUser = yield store.create(user);
        const token = (0, signToken_1.signJwt)(createdUser);
        res.json(`${token}`);
    }
    catch (err) {
        throw new Error(`couldn't create user ${req.body.firstname}, ${err}`);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const password = req.body.password;
        const user = (yield store.authenticate(firstname, password));
        if (!user) {
            return res.status(422).json('Please enter valid firstname and password');
        }
        const token = (0, signToken_1.signJwt)(user);
        res.json(token);
    }
    catch (err) {
        throw new Error(`couldn't authenticate user ${req.body.firstname}, ${err}`);
    }
});
const userRoutes = (app) => {
    app.get('/users', verifyToken_1.verifyJwt, index);
    app.get('/users/:id', authToken_1.authJwt, show);
    app.post('/users', create);
    app.post('/login', authenticate);
};
exports.default = userRoutes;
