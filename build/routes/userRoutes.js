"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const verifyToken_1 = require("../libs/verifyToken");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/register', verifyToken_1.TokenValidation, userController_1.default.register);
        this.router.get('/profile', verifyToken_1.TokenValidation, userController_1.default.getProfile);
    }
}
const rou = new UserRoutes();
exports.default = rou.router;
