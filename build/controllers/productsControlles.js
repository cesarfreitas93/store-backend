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
const product_1 = require("../models/product");
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT *, 1 as qnt FROM products');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM products WHERE id = ?', [id]);
            console.log(games.length);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "The product doesn't exits" });
        });
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { name, price, sku, descript, cate } = req.body;
            const photo = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) == undefined ? 'default.png' : (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
            const pro = new product_1.Product(name, photo, sku, price, descript, cate);
            const result = yield database_1.default.query('INSERT INTO products set ?', pro);
            res.json({ message: 'Product Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The product was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM products WHERE id = ?', [id]);
            res.json({ message: "The product was deleted" });
        });
    }
}
const productsController = new ProductsController;
exports.default = productsController;
