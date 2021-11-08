import { Request, Response } from 'express';


import pool from '../database';

class CategoriesController {

    public async list(req: Request, res: Response): Promise<void> {
        const result = await pool.query('SELECT * FROM categories');
        res.json(result);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        console.log(result.length);
        if (result.length > 0) {
            return res.json(result[0]);
        }
        res.status(404).json({ text: "The categorie doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO categories set ?', [req.body]);
        res.json({ message: 'Categorie Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE categories set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The categorie was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM categories WHERE id = ?', [id]);
            res.json({ message: "The categorie was deleted" });       
        } catch (error) {
            res.json({ hubo_error: true, error: error });
        }

    }
}

const categoriesController = new CategoriesController;
export default categoriesController;