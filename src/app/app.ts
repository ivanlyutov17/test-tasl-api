import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductRoutes from '../products/products.routes';
interface Route {
  router: Router;
}

class App {
  public app: express.Application;

  constructor(routes: Route[]) {
    this.app = express();
    this.set_config();
    this.initializeRoutes(routes);
  }

  private set_config() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(express.static('static'));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}

export default new App([new ProductRoutes()]).app;
