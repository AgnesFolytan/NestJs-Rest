import { Controller, Get, Render, Param, Delete, Post, Body, NotFoundException} from '@nestjs/common';
import { AppService } from './app.service';
import { create } from 'domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #products = [
    {
      name: 'Bucket',
      price: 3500,
    },
    {
      name: 'Rest APi dummies',
      price: 7850,
    },
    {  
      name: 'Tablet',
      price: 450000,
    }
  ];

  @Get('products')
  listProducts(){
    return this.#products;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string){
    return this.#products[Number(id)];
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string){
    const idNum = Number(id)
    if (idNum >= this.#products.length || idNum < 0) {
      throw new NotFoundException("No product with this ID")
    }
    this.#products.splice(Number(id), 1);
  }

  @Post('products')
  newProducts(@Body() createProductDto: createProductDto) {
    this.#products.push(createProductDto);
  }
}
