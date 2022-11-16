import { readFileSync, writeFileSync } from 'fs';
import { uuid } from 'uuidv4';
import { filepath } from '../helpers/constants';
import { AddProductDto } from './dto/addProduct.dto';
import { GetProductDto } from './dto/getProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

class ProductsService {
  public async getAllProducts() {
    const data = readFileSync(filepath, { encoding: 'utf8' });
    return JSON.parse(data);
  }
  public async writeProducts(products) {
    writeFileSync(filepath, JSON.stringify(products), { encoding: 'utf8' });
  }
  public async getProduct(id) {
    const allProducts = await this.getAllProducts();
    const product = allProducts.filter((el) => el.id == id);
    return product[0];
  }
  public async updateProduct(productData: UpdateProductDto) {
    let allProducts = await this.getAllProducts();
    const updatedProducts = allProducts.filter((el) => el.id != productData.id);

    updatedProducts.push({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      updateDate: new Date(Date.now()),
    });

    await this.writeProducts(updatedProducts);
  }
  public async createProduct(productData) {
    productData = { id: uuid(), ...productData, updateDate: new Date(Date.now()) };
    const allProducts = await this.getAllProducts();
    allProducts.push(productData);
    await this.writeProducts(allProducts);
  }
  public async removeProduct(id: number) {
    const allProducts = await this.getAllProducts();
    const updatedProducts = allProducts.filter((el) => el.id !== id);
    await this.writeProducts(updatedProducts);
  }
}

export default ProductsService;
