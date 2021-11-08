"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = __importDefault(require("../controllers/categoriesController"));
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', categoriesController_1.default.list);
        this.router.get('/:id', categoriesController_1.default.getOne);
        this.router.post('/', categoriesController_1.default.create);
        this.router.put('/:id', categoriesController_1.default.update);
        this.router.delete('/:id', categoriesController_1.default.delete);
    }
}
const prodRouter = new ProductsRoutes();
exports.default = prodRouter.router;
