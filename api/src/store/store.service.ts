import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';
import { StoreModel } from './interfaces/store-model.interface';
@Injectable()
export class StoreService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    const store: StoreModel = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../', 'data.json'), 'utf8'),
    );
    await this.cacheManager.set('users', store.users, 0);
    await this.cacheManager.set('products', store.products, 0);
  }
}
