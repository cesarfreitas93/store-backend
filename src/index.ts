import dotenv from 'dotenv';
import express , {Application, application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import ordersRoutes from './routes/ordersRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

class Server{
     app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes():void{
        this.app.use('/api/v1/',indexRoutes);
        this.app.use('/api/v1/products',productsRoutes);
        this.app.use('/api/v1/categories',categoriesRoutes);
        this.app.use('/api/v1/uploads', express.static(path.resolve('uploads')));
        this.app.use('/api/v1/orders', ordersRoutes);
        this.app.use('/api/v1/auth', authRoutes);
        this.app.use('/api/v1/users', userRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('server on port 3000'); 
        });
    }
}

const server = new Server();
server.start();