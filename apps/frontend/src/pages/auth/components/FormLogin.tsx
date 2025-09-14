import { Input } from "../../../components/form/Input";
import { MessageErrorFrom } from "../../../components/form/MessageErrorFrom";
import {
  validationEmailForm,
  validationPasswordForm,
} from "../validations/InputValidationCases";
import { Button } from "../../../components/button/Button";

export const commonInputClasses =
  "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";

export const textErrorClasses = "text-red-600 text-sm font-bold";

export const FormLogin = () => {
  return (
    <div className="container mx-auto px-6 py-16 ">
      <form className="max-w-lg mx-auto p-8 bg-white/30 shadow-lg rounded-lg ">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Formulario de Iniciar Sesion
        </h2>
        <div className="space-y-6">
          <div>
            <Input
              className={commonInputClasses}
              type="email"
              id="email"
              name="email"
              validationInput={validationEmailForm}
            >
              <MessageErrorFrom className={textErrorClasses} />
            </Input>
          </div>
          {/* Input de Contraseña */}
          <div>
            <Input
              className={commonInputClasses}
              type="password"
              id="password"
              name="password"
              validationInput={validationPasswordForm}
            >
              <MessageErrorFrom className={textErrorClasses} />
            </Input>
          </div>

          <Button variant="indigo">Registrarme</Button>
        </div>
      </form>
    </div>
  );
};
