import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { filter, from, lastValueFrom, toArray } from 'rxjs';
import { ProductModel } from './interfaces/product-model.interface';

@Injectable()
export class ProductService {
  private products: ProductModel[] = [];

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    this.products = await this.cacheManager.get('products');
  }

  async get({
    page,
    categoryId,
    search,
  }: {
    page: number;
    categoryId?: number;
    search?: string;
  }) {
    const perPage = 10;
    const source = from(this.products)
      .pipe(
        filter((product) => !categoryId || product.category.id === categoryId),
      )
      .pipe(
        filter(
          (product) =>
            !search ||
            product.name.toLowerCase().includes(search.toLowerCase()),
        ),
      )
      .pipe(toArray());

    const products = await lastValueFrom(source);

    const totalPage = Math.ceil(products.length / perPage);

    if (page > totalPage || page < 1) {
      return [];
    }

    return {
      products: products.slice((page - 1) * perPage, page * perPage),
      total: products.length,
      current: page,
      next: page + 1 > totalPage ? null : page + 1,
      totalPage: totalPage,
    };
  }
}
