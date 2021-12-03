/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductSchema } from './Product.model';
@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports:[MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),]
})
export class ProductsModule {}
