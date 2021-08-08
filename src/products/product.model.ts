export class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}

export type UpdateProduct = Partial<Omit<Product, 'id'>>;
