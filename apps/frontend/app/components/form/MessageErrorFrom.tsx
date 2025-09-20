import type React from "react";

// Definimos la interfaz de las props para un tipado más preciso
export interface MessageErrorFromProps {
	className?: string;
	children?: React.ReactNode; // Esperamos el mensaje de error aquí
}

export const MessageErrorFrom: React.FC<MessageErrorFromProps> = ({ className, children }) => {
	// No renderizamos nada si no hay children (mensaje)
	if (!children) {
		return null;
	}
	return <p className={`error-message ${className || ""}`}>{children}</p>;
};

