import {z} from "zod"
export const loginvalidations = z.object({
     email:z
     .string()
     .toLowerCase()
     .email("Invalid Email address")
     .trim(),
     password:z
     .string()
     .min(8 , "Password length should be more than 8")

     
})

export type RegisterBodyx = z.infer<typeof loginvalidations>