"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
(0, products_1.default)(app);
(0, user_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
