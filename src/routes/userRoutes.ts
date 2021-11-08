import { Router } from 'express';
import userController from '../controllers/userController'; 
import {TokenValidation} from '../libs/verifyToken';
class UserRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() {
        this.router.post('/register', TokenValidation , userController.register );
        this.router.get('/profile', TokenValidation, userController.getProfile);
    }
}

const rou = new UserRoutes();
export default rou.router;