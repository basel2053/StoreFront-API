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
const product_1 = require("../models/product");
const verifyToken_1 = require("../middlewares/verifyToken");
const store = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        if (req.query.category) {
            products = yield store.filter(req.query.category);
        }
        else {
            products = yield store.index();
        }
        res.json(products);
    }
    catch (err) {
        throw new Error(`couldn't get products, ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (err) {
        throw new Error(`couldn't get product ${req.params.id}, ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const createdProduct = yield store.create(product);
        res.json(createdProduct);
    }
    catch (err) {
        throw new Error(`couldn't create product ${req.body.name}, ${err}`);
    }
});
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyToken_1.verifyJwt, create);
};
exports.default = productsRoutes;
