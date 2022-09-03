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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get orders ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get order ${id}, ${err}`);
            }
        });
    }
    addProducts(quantity, orderId, productId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [orderId]);
                const order = result.rows[0];
                if (order.status != 'active') {
                    throw new Error(`Could not add product ${productId} to order ${orderId} because order is ${order.status}`);
                }
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (decoded.user.id != order.user_id) {
                    throw new Error(`You cannot add products to other users orders`);
                }
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
                const result = yield conn.query(sql, [orderId, productId, quantity]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to ${orderId}, ${err}`);
            }
        });
    }
    userOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                if (order.status == 'active') {
                    return order;
                }
                return null;
            }
            catch (err) {
                throw new Error(`Cannot get user ${id} Current order, ${err}`);
            }
        });
    }
    userCompletedOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const result = yield conn.query(sql, [id]);
                const orders = result.rows;
                if (orders.length > 0) {
                    const completedOrders = [];
                    for (let i = 0; i < orders.length; i++) {
                        if (orders[i].status == 'complete') {
                            completedOrders.push(orders[i]);
                        }
                    }
                    return completedOrders;
                }
                return null;
            }
            catch (err) {
                throw new Error(`Cannot get user ${id} Completed orders, ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
