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
