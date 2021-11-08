import { Router } from 'express';
import OrdersController from '../controllers/ordersController';
import {TokenValidation} from '../libs/verifyToken';
class OrdersRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() {
        this.router.post('/',TokenValidation, OrdersController.createOrder);
        this.router.post('/detail', OrdersController.createOrderDetail);
        this.router.get('/', OrdersController.ordersfindall);
        this.router.put('/:status/:order',TokenValidation, OrdersController.orderUpdate);
        this.router.get('/own', TokenValidation, OrdersController.getMyOrders);
    }
}

const orderRoute = new OrdersRoutes();
export default orderRoute.router;