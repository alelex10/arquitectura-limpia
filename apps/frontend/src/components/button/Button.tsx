// src/components/button/Button.tsx
import React from "react";

// Tipos para las variantes del botón
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary", // Por defecto, el botón es 'primary'
	className = "", // Permitir añadir clases personalizadas
	...props // Capturar otras props como onClick, type, etc.
}) => {
	// Clases base comunes a todos los botones
	const baseClasses =
		"px-6 py-3 rounded font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out";

	// Clases específicas según la variante
	let variantClasses = "";
	let hoverVariantClasses = "";

	switch (variant) {
		case "primary":
			variantClasses = "bg-gray-200 text-gray-800";
			hoverVariantClasses = "hover:bg-gray-100";
			break;
		case "secondary":
			variantClasses = "bg-blue-600 text-white";
			hoverVariantClasses = "hover:bg-blue-700";
			break;
		default:
			variantClasses = "bg-white text-blue-600"; // Default a primary
			hoverVariantClasses = "hover:bg-gray-100";
	}

	// Clases para el estado de foco (ajustadas según la variante)
	let focusClasses = "";
	if (variant === "primary") {
		focusClasses = "focus:ring-gray-100";
	} else {
		// secondary
		focusClasses = "focus:ring-blue-500";
	}

	// Combinar todas las clases
	const allClasses = `${baseClasses} ${variantClasses} ${hoverVariantClasses} ${focusClasses} ${className}`;

	return (
		<button className={allClasses} {...props}>
			{children}
		</button>
	);
};
