import { Request, Response } from 'express';
import pool from '../database';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
class UserController{


    public async register(req: Request, res: Response): Promise<void> {
        
        let pass: any;
        const {username, password } = req.body;
        const role = 'admin';
        pass = await bcrypt.hash(password, 10);
        const user_ = new User(username.toLowerCase(), pass, role);
        const result = await pool.query('INSERT INTO users set ?', user_);
        const token: string = jwt.sign({_id : result.insertId}, process.env.JWT_KEY || 'TOKEN_TEST');
        res.header('auth-token', token).json({ message: 'User Saved' , data: result});
    }

    public async getProfile(req: Request, res: Response): Promise<any> {
        const user__ = await pool.query('SELECT * FROM users WHERE id = ? limit 1', [req.userId]);
        if (user__) {
            return res.json({ user: user__[0] });
        }
        res.status(404).json("Nothing User!");
    }

  

}
const userController = new UserController;
export default userController;