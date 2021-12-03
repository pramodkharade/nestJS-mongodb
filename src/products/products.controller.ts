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
 async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice,
  ) {
    const productId = await this.productService.addProduct(
      prodTitle,
      prodDes,
      prodPrice,
    );
    return { id: productId };
  }
  @Get()
 async getAllProducts() {
    return await this.productService.getListProducts();
  }
  @Get(':id')
 async getProduct(@Param('id') prodId: string) {
    return await this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice: string,
  ) {
    return await this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDes,
      prodPrice,
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    return await this.productService.deleteProduct(prodId);
  }
}
