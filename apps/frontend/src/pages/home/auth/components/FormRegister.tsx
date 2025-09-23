import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { URL_REGISTER_USER } from "../../../../constants/constants";
import { fetchApi } from "../../../../api/fetchApi";
import { registerSchema, type RegisterFormData } from "../schemas/authSchema";
import { Form } from "react-router";
import type { Route } from "./+types/FormRegister";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await fetchApi({
    endpoint: URL_REGISTER_USER,
    type: "POST",
    body: data,
  });
  console.log("Datos del formulario:", data);
  console.log("Respuesta del servidor:", response);
}

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Para acceder a los errores de validación
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Datos del formulario:", data);
  });


  const commonInputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";
  const errorInputClasses = "border-red-500 focus:ring-red-500";
  const textErrorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="container mx-auto px-6 py-16">
      <Form
        onSubmit={onSubmit}
        method="post"
        className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Formulario de Registro
        </h2>
        <div className="space-y-6">
          {/* Campo de Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              className={`${commonInputClasses} ${errors.name ? errorInputClasses : ""}`}
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className={textErrorClasses} role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${commonInputClasses} ${errors.email ? errorInputClasses : ""}`}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className={textErrorClasses} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className={`${commonInputClasses} ${errors.password ? errorInputClasses : ""}`}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className={textErrorClasses} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo de Repetir Contraseña */}
          <div>
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Repetir Contraseña
            </label>
            <input
              id="repeatPassword"
              type="password"
              className={`${commonInputClasses} ${errors.repeatPassword ? errorInputClasses : ""}`}
              {...register("repeatPassword")}
              aria-invalid={errors.repeatPassword ? "true" : "false"}
            />
            {errors.repeatPassword && (
              <p className={textErrorClasses} role="alert">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Registrarse
          </button>
        </div>
      </Form>
    </div>
  );
};

export default FormRegister;
