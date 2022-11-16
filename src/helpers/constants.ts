import path from 'path';
import { AddProductDto } from '../products/dto/addProduct.dto';
import { GetProductDto } from '../products/dto/getProduct.dto';
import { RemoveProductDto } from '../products/dto/removeProductDto';
import { UpdateProductDto } from '../products/dto/updateProduct.dto';

export const Endpoints = {
  '/product': GetProductDto,
  '/product/update': UpdateProductDto,
  '/product/create': AddProductDto,
  '/product/remove': RemoveProductDto,
};

export const filepath = path.join(__dirname, '../database/database.json');
