import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product, UpdateProduct } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private id = 0;

  addProduct(product: Partial<Product>): Product {
    product.id = ++this.id;
    this.products.push(product as Product);
    return product as Product;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: number): Product {
    const [product] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException(`No product found with id ${id}`);
    }
    return { ...product };
  }

  getUpdatedProduct(id: number, partialProduct: UpdateProduct): Product {
    let [product, index] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException(`No product found with id ${id}`);
    }
    if (partialProduct.hasOwnProperty('id')) {
      throw new BadRequestException(`Update payload cannot have id field`);
    }
    if (!partialProduct.title) {
      delete partialProduct.title;
    }
    if (!partialProduct.description) {
      delete partialProduct.description;
    }
    if (partialProduct.price === null || partialProduct.price === undefined) {
      delete partialProduct.price;
    }
    const newProduct = {
      ...product,
      ...partialProduct,
    };
    this.products[index] = newProduct;
    return { ...newProduct };
  }

  deleteProduct(id: number): void {
    let [product, index] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException(`No product found with id ${id}`);
    }
    this.products.splice(index, 1);
  }

  private findProduct(id: number): [Product, number] {
    const index = this.products.findIndex((each: Product) => each.id === id);
    const product = this.products[index];
    return [product, index];
  }
}
