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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Testing Product model', () => {
    it('get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield store.index();
        expect(products).toEqual([
            { id: 1, name: 'chooclate', price: 15, category: 'food' },
            { id: 2, name: 'apple', price: 5.25, category: 'food' },
            { id: 3, name: 'cheese', price: 20.45, category: 'food' },
            { id: 4, name: 'burger', price: 39.8, category: 'food' },
            { id: 5, name: 'milk', price: 17.5, category: 'drinks' },
            { id: 6, name: 'cola', price: 6.12, category: 'drinks' },
            { id: 7, name: 'sprite', price: 6.12, category: 'drinks' },
            { id: 8, name: 'water', price: 4.95, category: 'drinks' },
            { id: 9, name: 'soup', price: 12, category: 'health' },
            { id: 10, name: 'shampoo', price: 35, category: 'health' },
        ]);
    }));
    it('get product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.show(4);
        expect(product).toEqual({
            id: 4,
            name: 'burger',
            price: 39.8,
            category: 'food',
        });
    }));
    it('get products by category', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield store.filter('food');
        expect(products).toEqual([
            { id: 1, name: 'chooclate', category: 'food' },
            { id: 2, name: 'apple', category: 'food' },
            { id: 3, name: 'cheese', category: 'food' },
            { id: 4, name: 'burger', category: 'food' },
        ]);
    }));
    it('create new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.create({
            name: 'sunblock',
            price: 60,
            category: 'health',
        });
        const { id } = product, other = __rest(product, ["id"]);
        expect(other).toEqual({
            name: 'sunblock',
            price: 60,
            category: 'health',
        });
    }));
});
