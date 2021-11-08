import { Request, Response } from 'express';


import pool from '../database';
import { Product } from '../models/product';

class ProductsController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT *, 1 as qnt FROM products');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        console.log(games.length);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "The product doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {

        console.log(req.body)

        const {name, price, sku, descript, cate} = req.body;
        const photo = req.file?.path == undefined ?  'default.png': req.file?.path;

        const pro = new Product(name, photo, sku, price, descript, cate);
        const result = await pool.query('INSERT INTO products set ?', pro);
        res.json({ message: 'Product Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: "The product was deleted" });
    }
}

const productsController = new ProductsController;
export default productsController;