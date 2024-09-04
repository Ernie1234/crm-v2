import { Transaction, TransactionType } from "@prisma/client";

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
  role: "USER" | "ADMIN";
};

export type TTransactionData = {
  id: number;
  commodityName: string;
  type: TransactionType;
  quantity: number;
  status: "abandoned" | "success" | "failed";
  reference: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  domain: string;
  receipt_number: null;
  amount: number;
  message: null;
  gateway_response: string;
  paid_at: null;
  created_at: string;
  channel: "card";
  currency: "NGN" | "USD";
  ip_address: string;
  metadata: {
    commodityName: string;
    email: string;
    quantity: string;
    price: string;
    paymentMethod: "CARD";
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string;
    cvc: string;
  };
  log: null;
  fees: null;
  fees_split: null;
  authorization: {};
  customer: {
    id: number;
    first_name: null;
    last_name: null;
    email: string;
    customer_code: string;
    phone: null;
    metadata: null;
    risk_action: "default";
    international_format_phone: null;
  };
  plan: null;
  split: {};
  order_id: null;
  paidAt: null;
  requested_amount: number;
  pos_transaction_data: null;
  source: null;
  fees_breakdown: null;
  connect: null;
  transaction_date: string;
  plan_object: {};
  subaccount: {};
};

export type TAllTrans = {
  id: string;
  commodityName: string;
  type: TransactionType;
  quantity: number | null;
  status: string | null;
  reference: string | null;
  unit: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type TPortfolioCommodity = {
  id: string;
  userId: string;
  commodityName: string;
  color: string;
  balance: number;
  totalQuantity: number;
  createdAt: Date;
  updatedAt: Date;
};
export type IBuy = {
  name: string;
  price: {
    price: number;
  }[];
  unit: string;
  minQuantity: number;
  maxQuantity: number;
};

export interface ISellUser {
  id: string;
  userId: string;
  commodityName: string;
  bank: string;
  accountNumber: number;
  amount: number;
  status: string | null; // Assuming these are possible statuses
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
    emailVerified: Date | null; // Assuming emailVerified can be null
    image: string | null; // Assuming image can be null
    password: string | null;
    hasNotification: boolean;
    role: "USER" | "ADMIN"; // Assuming role can be USER or ADMIN
    createdAt: Date; // ISO date string
    updatedAt: Date; // ISO date string
  };
}
