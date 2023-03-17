import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, UpdateProduct } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addProduct(@Body() product: Partial<Product>): Product {
    return this.productsService.addProduct(product);
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
    @Body() product: UpdateProduct
  ): Product {
    return this.productsService.getUpdatedProduct(+productId, product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id', ParseIntPipe) productId: string): void {
    this.productsService.deleteProduct(+productId);
  }
}
