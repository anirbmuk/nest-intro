export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export type UpdateProduct = Partial<Omit<Product, 'id'>>;
