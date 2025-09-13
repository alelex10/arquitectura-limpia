
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

export const validationRepeatPasswordForm = (password: string, repeatPassword: string) => {
	if (!repeatPassword) return "La contraseña es requerida";
	if (password !== repeatPassword) return "Las contraseñas no coinciden";
	return "";
};

