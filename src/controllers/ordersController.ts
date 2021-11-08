import { Request, Response } from 'express';
import pool from '../database';
class OrdersController{

    public async createOrder(req: Request, res: Response): Promise<void> {
        const { direccion,celular,tipopago,creditcard,exp,ccv } = req.body;
        const user = req.userId;
        const status = "S";

        const query_ = "INSERT INTO `orders` (`user`, `status`, `direccion`, `celular`, `tipopago`, `creditcard`, `exp`, `ccv`) "+
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await pool.query(query_, [user,status, direccion,celular,tipopago,creditcard,exp,ccv]);
        res.json({ message: 'Order Saved' });
    }

    public async getMyOrders(req: Request, res: Response): Promise<void>{
        const user = req.userId;
        const sql_ = "SELECT * FROM `orders` as ord WHERE ord.user like '?'";
        const result = await pool.query(sql_, [user]);
        res.json(result);
    }

    public async createOrderDetail(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO order_detail set ?', [req.body]);
        res.json({ message: 'OrderDetail Saved' });
    }

    public async ordersfindall(req: Request, res: Response): Promise<void>{
        const games = await pool.query('SELECT *, (select u.username from users u where ordenes.user = u.id ) as client FROM orders ordenes');
        res.json(games);
    }

    public async orderUpdate(req: Request, res: Response): Promise<void> {
        const { status, order } = req.params;
        await pool.query('UPDATE orders set status = ? WHERE id = ?', [status, order]);
        res.json({ message: "The order was Updated" });
    }

}
const ordersController = new OrdersController;
export default ordersController;