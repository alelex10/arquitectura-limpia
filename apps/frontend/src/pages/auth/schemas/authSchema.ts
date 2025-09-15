import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(8).max(20),
    repeatPassword: z.string().min(8).max(20),
    
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20),
});

// export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;