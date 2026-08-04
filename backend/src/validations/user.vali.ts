import {z} from "zod"

export const uservalidations = z.object({
     username:z
     .string()
     .trim()
     .min(3 , "Username Should be more than 3 letters")
     .max(30 ,"Username Should be less than 30 letters"),
     email:z
     .string()
     .toLowerCase()
     .email("Invalid Email address")
     .trim(),
     password:z
     .string()
     .min(8 , "Password length should be more than 8")

     
})

export type RegisterBody = z.infer<typeof uservalidations>