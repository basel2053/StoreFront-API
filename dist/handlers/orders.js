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
const order_1 = require("../models/order");
const authToken_1 = require("../middlewares/authToken");
const verifyToken_1 = require("../middlewares/verifyToken");
const store = new order_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        throw new Error(`Couldn't get orders ,${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        throw new Error(`Couldn't get order ${req.params.id}, ${err}`);
    }
});
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quantity = parseInt(req.body.quantity);
        const orderId = parseInt(req.params.id);
        const productId = parseInt(req.body.productId);
        const authorizationHeader = req.headers.authorization;
        const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) ||
            req.body.token;
        const orderProduct = yield store.addProducts(quantity, orderId, productId, token);
        res.json(orderProduct);
    }
    catch (err) {
        throw new Error(`Couldn't add product ${req.body.productId} to order ${req.params.id}, ${err}`);
    }
});
const userOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.userOrder(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        throw new Error(`Couldn't get user ${req.params.id} active order , ${err}`);
    }
});
const userCompletedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.userCompletedOrders(parseInt(req.params.id));
        res.json(orders);
    }
    catch (err) {
        throw new Error(`Couldn't get user ${req.params.id} completed orders,${err}`);
    }
});
const ordersRoutes = (app) => {
    app.get('/orders', verifyToken_1.verifyJwt, index);
    app.get('/orders/:id', verifyToken_1.verifyJwt, show);
    app.post('/orders/:id/products', verifyToken_1.verifyJwt, addProducts);
    app.get('/users/:id/orders', authToken_1.authJwt, userOrder);
    app.get('/users/:id/completedorders', authToken_1.authJwt, userCompletedOrders);
};
exports.default = ordersRoutes;
