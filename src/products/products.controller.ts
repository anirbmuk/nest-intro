import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, UpdateProduct } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): Product {
    const newProduct: Partial<Product> = {
      title: productTitle,
      description: productDescription,
      price: productPrice,
    };
    return this.productsService.addProduct(newProduct);
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) productId: string): Product {
    return this.productsService.getProduct(+productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId: string,
    @Body('title') productTitle?: string,
    @Body('description') productDescription?: string,
    @Body('price') productPrice?: number,
  ): Product {
    const partialProduct: UpdateProduct = {
      title: productTitle,
      description: productDescription,
      price: productPrice,
    };
    return this.productsService.getUpdatedProduct(+productId, partialProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) productId: string): void {
    this.productsService.deleteProduct(+productId);
  }
}
