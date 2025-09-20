import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(20, { message: "El nombre no puede exceder los 20 caracteres" }),
    email: z.email({ message: "Formato de email inválido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(20, { message: "La contraseña no puede exceder los 20 caracteres" }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"], // Asocia el error al campo repeatPassword
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

// export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;
