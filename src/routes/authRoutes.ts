import { Router } from 'express';
import authController from '../controllers/authController'; 
class AuthRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() {
        this.router.post('/login',authController.login);
        this.router.post('/register', authController.register);
    }
}

const rou = new AuthRoutes();
export default rou.router;