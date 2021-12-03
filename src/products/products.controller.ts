/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice,
  ) {
    const productId = this.productService.addProduct(
      prodTitle,
      prodDes,
      prodPrice,
    );
    return { id: productId };
  }
  @Get()
  getAllProducts() {
    return this.productService.getListProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice: string,
  ) {
    return this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDes,
      prodPrice,
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    return this.productService.deleteProduct(prodId);
  }
}
