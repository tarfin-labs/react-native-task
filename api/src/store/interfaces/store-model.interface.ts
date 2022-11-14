import { ProductModel } from '../../product/interfaces/product-model.interface';
import { UserModel } from '../../user/interfaces/user-model.interface';

export interface StoreModel {
  users: UserModel[];
  products: ProductModel[];
}
