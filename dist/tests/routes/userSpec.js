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
describe('Testing Users endpoints', () => {
    it('GET /users - all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJiaWciLCJsYXN0bmFtZSI6ImJlYW56IiwicGFzc3dvcmQiOiIkMmIkMTAkRHVXdGJyWmk5V3BRL1N4bGRyQW5jZUQveWVnUFZvbmJiYUhoSHJDcUVwTkJNOWN2VllqWjYifSwiaWF0IjoxNjU0ODY5OTQ3fQ.gEwMnRBijzV5mreHP1meU-sdSy_0Ln0d_o5WbfC_bw4');
        expect(response.status).toBe(200);
    }));
    it('GET /users/:id - single user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users/2')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJiaWciLCJsYXN0bmFtZSI6ImJlYW56IiwicGFzc3dvcmQiOiIkMmIkMTAkRHVXdGJyWmk5V3BRL1N4bGRyQW5jZUQveWVnUFZvbmJiYUhoSHJDcUVwTkJNOWN2VllqWjYifSwiaWF0IjoxNjU0ODY5OTQ3fQ.gEwMnRBijzV5mreHP1meU-sdSy_0Ln0d_o5WbfC_bw4');
        expect(response.status).toBe(200);
    }));
    it('POST /users - create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users').send({
            firstname: 'ahmed',
            lastname: 'abdullah',
            password: 'password123',
        });
        expect(response.status).toBe(200);
    }));
    it('POST /login - user authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/login').send({
            firstname: 'ahmed',
            password: 'password123',
        });
        expect(response.status).toBe(200);
    }));
});
