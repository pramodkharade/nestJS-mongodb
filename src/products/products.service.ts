/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './Product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
constructor( @InjectModel('Product') private readonly productModel: Model<Product>,){}
 async addProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }
 async getListProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

 async getSingleProduct(productId: string) {
  const product = await this.findProduct(productId);
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
  };
  }

 async updateProduct(productId: string, title: string, desc: string, price) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }
  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({_id: productId}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
    return productId;
  }
  private async  findProduct(id: string) : Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
}
}