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

export type TUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  password: string | null;
  phoneNumber: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  updatedAt: Date;
};
