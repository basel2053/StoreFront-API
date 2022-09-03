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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.UserStore();
describe('Testing User model', () => {
    it('get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield store.index();
        expect(users).toEqual([
            {
                id: 1,
                firstname: 'bassel',
                lastname: 'salah',
                password: 'password123',
            },
            { id: 2, firstname: 'john', lastname: 'doe', password: '123456' },
        ]);
    }));
    it('get user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.show(2);
        expect(user).toEqual({
            id: 2,
            firstname: 'john',
            lastname: 'doe',
            password: '123456',
        });
    }));
    it('create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.create({
            firstname: 'jane',
            lastname: 'bob',
            password: '000000',
        });
        const { id, password } = user, other = __rest(user, ["id", "password"]);
        expect(other).toEqual({
            firstname: 'jane',
            lastname: 'bob',
        });
    }));
    it('correct user password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.create({
            firstname: 'jonas',
            lastname: 'andrew',
            password: '224468',
        });
        const validatePassword = bcrypt_1.default.compareSync(('224468' + process.env.PEPPER), user.password);
        expect(validatePassword).toBeTrue();
    }));
    it('getting authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.authenticate('jonas', '224468');
        const _a = user, { id, password } = _a, other = __rest(_a, ["id", "password"]);
        expect(other).toEqual({
            firstname: 'jonas',
            lastname: 'andrew',
        });
    }));
    it("get null if user doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.authenticate('jack', '123456');
        expect(user).toBeNull();
    }));
});
