"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordersController_1 = __importDefault(require("../controllers/ordersController"));
const verifyToken_1 = require("../libs/verifyToken");
class OrdersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', verifyToken_1.TokenValidation, ordersController_1.default.createOrder);
        this.router.post('/detail', ordersController_1.default.createOrderDetail);
        this.router.get('/', ordersController_1.default.ordersfindall);
        this.router.put('/:status/:order', verifyToken_1.TokenValidation, ordersController_1.default.orderUpdate);
        this.router.get('/own', verifyToken_1.TokenValidation, ordersController_1.default.getMyOrders);
    }
}
const orderRoute = new OrdersRoutes();
exports.default = orderRoute.router;
