export interface ProductModel {
  id: string;
  name: string;
  category: {
    id: number;
    name: string;
  };
  image: string;
  price: number;
}
