import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { messages } from '../helpers/messages';
import { AddProductDto } from './dto/addProduct.dto';
import { GetProductDto } from './dto/getProduct.dto';
import { RemoveProductDto } from './dto/removeProductDto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import ProductsService from './products.service';

export default class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = new ProductsService();
  }

  public getAllProducts = async (req: Request, res: Response) => {
    try {
      const allProducts = await this.productsService.getAllProducts();
      return res.status(200).json({ allProducts });
    } catch (err) {
      return res.status(500).json({ msg: messages.INTERNAL_SERVER_ERROR });
    }
  };
  public getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = plainToInstance(GetProductDto, req.query);
      const product = await this.productsService.getProduct(id);
      if (product) {
        return res.status(200).json({ product });
      }
      return res.status(400).json({ msg: messages.PRODUCT_NOT_EXIST });
    } catch (e) {
      return res.status(500).json({ msg: messages.INTERNAL_SERVER_ERROR });
    }
  };
  public updateProduct = async (req: Request, res: Response) => {
    try {
      const productData = plainToInstance(UpdateProductDto, req.body);
      const product = await this.productsService.getProduct(productData.id);
      if (!product) return res.status(400).json({ msg: messages.PRODUCT_NOT_EXIST });
      await this.productsService.updateProduct(productData);
      return res.status(200).json({ msg: messages.SUCCESS });
    } catch (e) {
      return res.status(500).json({ msg: messages.INTERNAL_SERVER_ERROR });
    }
  };
  public createProduct = async (req: Request, res: Response) => {
    try {
      const productData = plainToInstance(AddProductDto, req.body);
      await this.productsService.createProduct(productData);
      return res.status(200).json({ msg: messages.SUCCESS });
    } catch (e) {
      return res.status(500).json({ msg: messages.INTERNAL_SERVER_ERROR });
    }
  };
  public removeProduct = async (req: Request, res: Response) => {
    try {
      const { id } = plainToInstance(RemoveProductDto, req.body);
      const product = await this.productsService.getProduct(id);
      console.log(product);
      if (!product) return res.status(400).json({ msg: messages.PRODUCT_NOT_EXIST });

      await this.productsService.removeProduct(id);

      return res.status(200).json({ msg: messages.SUCCESS });
    } catch (e) {
      return res.status(500).json({ msg: messages.INTERNAL_SERVER_ERROR });
    }
  };
}
