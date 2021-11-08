"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/v1/', indexRoutes_1.default);
        this.app.use('/api/v1/products', productsRoutes_1.default);
        this.app.use('/api/v1/categories', categoriesRoutes_1.default);
        this.app.use('/api/v1/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        this.app.use('/api/v1/orders', ordersRoutes_1.default);
        this.app.use('/api/v1/auth', authRoutes_1.default);
        this.app.use('/api/v1/users', userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port 3000');
        });
    }
}
const server = new Server();
server.start();
