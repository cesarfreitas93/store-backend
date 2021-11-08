import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';
class ProductsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() {
        this.router.get('/', categoriesController.list);
        this.router.get('/:id', categoriesController.getOne);
        this.router.post('/', categoriesController.create);
        this.router.put('/:id', categoriesController.update);
        this.router.delete('/:id', categoriesController.delete);
    }
}

const prodRouter = new ProductsRoutes();
export default prodRouter.router;