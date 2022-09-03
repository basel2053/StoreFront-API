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
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe('Testing Order model', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJiYXNzZWwiLCJsYXN0bmFtZSI6InNhbGFoIiwicGFzc3dvcmQiOiIkMmIkMTAkTDAwcGlkdUNKTWVabWc0dFJQbVRoLmJiVWxaYk5qQ1hXcnRWcFdKcFRlNksyYU5lNE43eUMifSwiaWF0IjoxNjU0ODgwNTk2fQ.EkzG6N4Mw-IBBX8aOgHLN7aeL_1skjNrmt_kGsLA5J8';
    it('get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield store.index();
        expect(orders).toEqual([
            { id: 1, status: 'active', user_id: 1 },
            { id: 2, status: 'complete', user_id: 1 },
            { id: 3, status: 'complete', user_id: 1 },
            { id: 4, status: 'complete', user_id: 2 },
            { id: 5, status: 'complete', user_id: 2 },
        ]);
    }));
    it('get order by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield store.show(3);
        expect(order).toEqual({ id: 3, status: 'complete', user_id: 1 });
    }));
    it('add correct products to the right order', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderProducts = yield store.addProducts(3, 1, 8, token);
        expect(orderProducts).toEqual({
            id: 1,
            order_id: 1,
            product_id: 8,
            quantity: 3,
        });
    }));
    it('get user active order', () => __awaiter(void 0, void 0, void 0, function* () {
        const activeOrder = yield store.userOrder(1);
        expect(activeOrder).toEqual({ id: 1, status: 'active', user_id: 1 });
    }));
    it('get null if no order or all user orders are completed', () => __awaiter(void 0, void 0, void 0, function* () {
        const activeOrder = yield store.userOrder(2);
        expect(activeOrder).toBeNull();
    }));
    it('get only all user completed orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const completedOrders = yield store.userCompletedOrders(1);
        expect(completedOrders).toEqual([
            { id: 2, status: 'complete', user_id: 1 },
            { id: 3, status: 'complete', user_id: 1 },
        ]);
    }));
    it('get null if no completed orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const completedOrders = yield store.userCompletedOrders(3);
        expect(completedOrders).toBeNull();
    }));
});
