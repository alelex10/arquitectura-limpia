import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-router";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";



export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Datos del login:", data);
  });

  const commonInputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";
  const errorInputClasses = "border-red-500 focus:ring-red-500";
  const textErrorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="container mx-auto px-6 py-16">
      <Form
        onSubmit={onSubmit}
        className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Iniciar Sesión
        </h2>
        <div className="space-y-6">
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
              className={`${commonInputClasses} ${
                errors.email ? errorInputClasses : ""
              }`}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="tu.email@ejemplo.com"
            />
            {errors.email && (
              <p className={textErrorClasses} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

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
              className={`${commonInputClasses} ${
                errors.password ? errorInputClasses : ""
              }`}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className={textErrorClasses} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </div>
      </Form>
    </div>
  );
};
export default FormLogin;