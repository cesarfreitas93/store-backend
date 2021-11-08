import { Request, Response } from 'express';
import pool from '../database';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
class AuthController{

    public async login(req: Request, res: Response): Promise<any> {
        const { username, password } = req.body;
        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        const user__ = await pool.query('SELECT * FROM users WHERE username = ? limit 1', [username]);
        
        if (user__) {

            const verify_pass =  await bcrypt.compare(password, user__[0].password);
            if(verify_pass){
                const token: string = jwt.sign({_id : user__[0].id, _role: user__[0].role }, process.env.JWT_KEY || 'TOKEN_TEST',{
                    expiresIn: 60*60*24
                });
                return res.header('auth-token', token).json({ message: 'Login ok', token: token, role: user__[0].role});
            }else{
                res.status(400).json({ text: "Invalid password!" });
            }

           
        }else{
            res.status(404).json({ text: "Login fail!" });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        let pass: any;
        const {username, password } = req.body;
        const role = 'public';
        pass = await bcrypt.hash(password, 10);
        const user_ = new User(username.toLowerCase(), pass, role);
        const result = await pool.query('INSERT INTO users set ?', user_);
        const token: string = jwt.sign({_id : result.insertId}, process.env.JWT_KEY || 'TOKEN_TEST');
        res.header('auth-token', token).json({ message: 'Register ok', token: token, role: 'public' });
    }

  

}
const authController = new AuthController;
export default authController;