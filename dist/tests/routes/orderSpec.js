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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(app_1.default);
describe('Testing Orders endpoint', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJiYXNzZWwiLCJsYXN0bmFtZSI6InNhbGFoIiwicGFzc3dvcmQiOiIkMmIkMTAkTDAwcGlkdUNKTWVabWc0dFJQbVRoLmJiVWxaYk5qQ1hXcnRWcFdKcFRlNksyYU5lNE43eUMifSwiaWF0IjoxNjU0ODgwNTk2fQ.EkzG6N4Mw-IBBX8aOgHLN7aeL_1skjNrmt_kGsLA5J8';
    it('GET /orders - all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('GET /orders/:id - single order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('GET /users/:id/orders - user current order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users/1/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('GET /users/:id/completedorders - user completed orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users/1/completedorders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('POST /orders/:id/products - add products to order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orders/1/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            productId: 4,
            quantity: 3,
        });
        expect(response.status).toBe(200);
    }));
});
