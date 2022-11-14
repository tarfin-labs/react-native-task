import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VerifyPhoneGuard } from '../auth/verify-phone.guard';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(VerifyPhoneGuard)
  @Get('/')
  async get(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('categoryId', new DefaultValuePipe(0), ParseIntPipe)
    categoryId?: number,
    @Query('search') search?: string,
  ) {
    return this.productService.get({
      page,
      categoryId,
      search,
    });
  }
}
