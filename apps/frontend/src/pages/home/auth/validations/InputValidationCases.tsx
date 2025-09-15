import { useState } from "react";

export const validationNameForm = (name: string) => {
	if (!name) return "El nombre es requerido";
	if (name.length < 3) return "El nombre debe tener al menos 3 caracteres";
	if (name.length > 20) return "El nombre debe tener menos de 20 caracteres";
	if (!/^[a-zA-Z\s]+$/.test(name)) return "El nombre solo puede contener letras y espacios";

	return "";
};

export const validationEmailForm = (email: string) => {
	if (!email) return "El email es requerido";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El email no es valido";
	return "";
};

export const validationPasswordForm = (password: string) => {
	if (!password) return "La contraseña es requerida";
	if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
	if (password.length > 20) return "La contraseña debe tener menos de 20 caracteres";
	return "";
};

export const validationRepeatPasswordForm = (repeatPassword: string, passwordAux: string) => {
	if (repeatPassword !== passwordAux) return "Las contraseñas no coinciden";
	if (!repeatPassword) return "Repita la contraseña";
	return "";
};
export const useFormController = () => {
	const [passwordAux, setPasswordAux] = useState("");
	const [messageError, setMessageError] = useState({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
		button:"",
	});

	const handleSubmit = async (FormData: FormData) => {
		/* fingir envio con timer */
		await new Promise((resolve) => setTimeout(resolve, 1000));
	};

	const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		setMessageError((messageError) => ({ ...messageError, name: validationNameForm(name) }));
	};

	const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		const email = event.target.value;
		setMessageError((messageError) => ({ ...messageError, email: validationEmailForm(email) }));
	};

	const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		setMessageError((messageError) => ({
			...messageError,
			password: validationPasswordForm(password),
		}));
		setPasswordAux(password);
	};

	const handleInputRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const repeatPassword = event.target.value;
		console.log(passwordAux, repeatPassword);
		setMessageError((messageError) => ({
			...messageError,
			repeatPassword: validationRepeatPasswordForm(passwordAux, repeatPassword),
		}));
	};

	return {
		messageError,
		setMessageError,
		handleInputName,
		handleInputEmail,
		handleInputPassword,
		handleInputRepeatPassword,
		handleSubmit,
	};
};

