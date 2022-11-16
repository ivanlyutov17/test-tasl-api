import { Router } from 'express';
import { requestValidationMiddleware } from '../helpers/validation';
import ProductsController from './products.controller';
import ProductsService from './products.service';

class ProductRoutes {
  public router = Router();

  private productsController: ProductsController;

  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
    this.productsController = new ProductsController(this.productsService);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/all-products', this.productsController.getAllProducts);
    this.router.get('/product', requestValidationMiddleware, this.productsController.getProduct);
    this.router.patch('/product/update', requestValidationMiddleware, this.productsController.updateProduct);
    this.router.post('/product/create', requestValidationMiddleware, this.productsController.createProduct);
    this.router.delete('/product/remove', requestValidationMiddleware, this.productsController.removeProduct);
  }
}

export default ProductRoutes;
