export type TCommodity = {
  id: string;
  name: string;
  description: string;
  image: null | string;
  unit: string;
  minQuantity: number;
  maxQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  price: [
    {
      id: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
      commodityId: string;
    }
  ];
};
