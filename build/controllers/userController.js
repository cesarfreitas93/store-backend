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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pass;
            const { username, password } = req.body;
            const role = 'admin';
            pass = yield bcryptjs_1.default.hash(password, 10);
            const user_ = new user_1.User(username.toLowerCase(), pass, role);
            const result = yield database_1.default.query('INSERT INTO users set ?', user_);
            const token = jsonwebtoken_1.default.sign({ _id: result.insertId }, process.env.JWT_KEY || 'TOKEN_TEST');
            res.header('auth-token', token).json({ message: 'User Saved', data: result });
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user__ = yield database_1.default.query('SELECT * FROM users WHERE id = ? limit 1', [req.userId]);
            if (user__) {
                return res.json({ user: user__[0] });
            }
            res.status(404).json("Nothing User!");
        });
    }
}
const userController = new UserController;
exports.default = userController;
