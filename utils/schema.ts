import { z } from "zod";

//USER'S LOGIN FORM ZOD SCHEMA
export const userLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters.",
  }),
});

//USER'S REGISTER FORM ZOD SCHEMA
export const userRegisterFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long")
    .regex(
      /^[0-9+\s()-]+$/,
      "Phone number must only contain digits, +, -, (), and spaces"
    ),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(25, { message: "Password must be less than 26 characters." }),
});

//USER PROFILE DETAIL EDIT FORM ZOD SCHEMA
export const profileFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
  email: z.string().email("Invalid email address"),
  // imageUrl: z.string(),
});

//ADD COMMODITY FORM ZOD SCHEMA
export const commodityFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  minQuantity: z.string().min(1, {
    message: "Quantity must not be less than 1.",
  }),
  maxQuantity: z.string(),
  price: z.string().min(1, {
    message: "Price must not be less than 1.",
  }),
  unit: z.string(),
});
//EDIT COMMODITY FORM ZOD SCHEMA
export const editCommodityFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must not be less than 1.",
  }),
});
//BUY COMMODITY FORM ZOD SCHEMA
export const buyModalSchema = z.object({
  commodityName: z.string(),
  quantity: z.string(),
  paymentMethod: z.string(),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  expiryDate: z.string(),
  cvc: z.string(),
});
export const sellModalSchema = z.object({
  commodityName: z.string(),
  amount: z.string(),
  bankAcct: z.string(),
  bank: z.string(),
  acctNumber: z.string(),
});
export const swapModalSchema = z.object({
  commodityWallet: z.string(),
  transferTo: z.string(),
  amount: z.string(),
});
export const sendModalSchema = z.object({
  commodityWallet: z.string(),
  transferTo: z.string(),
  amount: z.string(),
});
