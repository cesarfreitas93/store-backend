"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsControlles_1 = __importDefault(require("../controllers/productsControlles"));
const multer_1 = __importDefault(require("../libs/multer"));
const verifyToken_1 = require("../libs/verifyToken");
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productsControlles_1.default.list);
        this.router.get('/:id', productsControlles_1.default.getOne);
        this.router.post('/', verifyToken_1.TokenValidation, multer_1.default.single('photo'), productsControlles_1.default.create);
        this.router.put('/:id', verifyToken_1.TokenValidation, productsControlles_1.default.update);
        this.router.delete('/:id', verifyToken_1.TokenValidation, productsControlles_1.default.delete);
    }
}
const prodRouter = new ProductsRoutes();
exports.default = prodRouter.router;
