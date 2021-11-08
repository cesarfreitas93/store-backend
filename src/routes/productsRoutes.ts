import { Router } from 'express';
import productsController from '../controllers/productsControlles';
import multer from '../libs/multer';
import {TokenValidation} from '../libs/verifyToken';

class ProductsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() {
        this.router.get('/', productsController.list);
        this.router.get('/:id', productsController.getOne);
        this.router.post('/',TokenValidation,multer.single('photo'), productsController.create);
        this.router.put('/:id',TokenValidation, productsController.update);
        this.router.delete('/:id',TokenValidation, productsController.delete);
    }
}

const prodRouter = new ProductsRoutes();
export default prodRouter.router;