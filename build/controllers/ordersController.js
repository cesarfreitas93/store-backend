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
const database_1 = __importDefault(require("../database"));
class OrdersController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { direccion, celular, tipopago, creditcard, exp, ccv } = req.body;
            const user = req.userId;
            const status = "S";
            const query_ = "INSERT INTO `orders` (`user`, `status`, `direccion`, `celular`, `tipopago`, `creditcard`, `exp`, `ccv`) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const result = yield database_1.default.query(query_, [user, status, direccion, celular, tipopago, creditcard, exp, ccv]);
            res.json({ message: 'Order Saved' });
        });
    }
    getMyOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.userId;
            const sql_ = "SELECT * FROM `orders` as ord WHERE ord.user like '?'";
            const result = yield database_1.default.query(sql_, [user]);
            res.json(result);
        });
    }
    createOrderDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO order_detail set ?', [req.body]);
            res.json({ message: 'OrderDetail Saved' });
        });
    }
    ordersfindall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT *, (select u.username from users u where ordenes.user = u.id ) as client FROM orders ordenes');
            res.json(games);
        });
    }
    orderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, order } = req.params;
            yield database_1.default.query('UPDATE orders set status = ? WHERE id = ?', [status, order]);
            res.json({ message: "The order was Updated" });
        });
    }
}
const ordersController = new OrdersController;
exports.default = ordersController;
