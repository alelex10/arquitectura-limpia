// src/components/form/FormCustom.tsx
import { useState } from "react"; // Importa React y useState
import { Input } from "./Input";
import { MessageErrorFrom } from "./MessageErrorFrom";
import {
	validationEmailForm,
	validationNameForm,
	validationPasswordForm,
	validationRepeatPasswordForm,
} from "./InputValidationCases";
import { Button } from "../button/Button";

export interface CompareInputsProps {
	id: string;
	target: EventTarget & HTMLInputElement;
}
const commonInputClasses =
	"w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";

const textErrorClasses = "text-red-500 text-sm";
export const FormCustom = () => {
	//! El que deberia tener la logica para comparar los inputs es el form

	const [inputsCompared, setInputsCompared] = useState<CompareInputsProps[]>();
	return (
		<div className="container mx-auto px-6 py-16">
			<form className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
				<h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Formulario de Registro</h2>
				<div className="space-y-6">
					<div>
						<Input
							className={commonInputClasses}
							type="text"
							id="name"
							name="name"
							validationInput={validationNameForm}
						>
							<MessageErrorFrom className={textErrorClasses} />
						</Input>
					</div>
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
							compared={{ id: "repeat-password", setCompareInputs: setInputsCompared }}
						>
							<MessageErrorFrom className={textErrorClasses} />
						</Input>
					</div>
					{/* Input de Repetir Contraseña */}
					<div>
						<Input
							className={commonInputClasses}
							type="password"
							id="repeat-password"
							name="repeat-password"
							validationInput={validationRepeatPasswordForm}
							compared={{ id: "repeat-password", setCompareInputs: setInputsCompared }} // Corregido para comparar con 'password'
						>
							<MessageErrorFrom className={textErrorClasses} />
						</Input>
					</div>

					<Button>Registrarse</Button>
				</div>
			</form>
		</div>
	);
};


