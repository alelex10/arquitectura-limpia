// src/components/button/Button.tsx
import React from "react";

// Tipos para las variantes del botón
type ButtonVariant = "indigo" | "blue" | "desabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  hasRing?: boolean;
}

export const Button = ({
  children,
  variant = "blue", // Por defecto, el botón es 'primary'
  className = "", // Permitir añadir clases personalizadas
  hasRing = false,
  ...props // Capturar otras props como onClick, type, etc.
}: ButtonProps) => {
  // Clases base comunes a todos los botones
  const baseClasses =
    "px-6 py-3 rounded font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out";

  // Clases específicas según la variante
  let variantClasses = "";
  let hoverVariantClasses = "";

  switch (variant) {
    case "indigo":
      variantClasses = "bg-indigo-600 text-white";
      hoverVariantClasses = "hover:bg-indigo-700";
      break;
    case "blue":
      variantClasses = "bg-blue-600 text-white";
      hoverVariantClasses = "hover:bg-blue-700";
      break;
    default:
      variantClasses = "bg-white text-blue-600"; // Default a primary
      hoverVariantClasses = "hover:bg-gray-100";
  }

  // Clases para el estado de foco (ajustadas según la variante)
  let focusClasses = "";
  switch (variant) {
    case "indigo":
      focusClasses = "focus:ring-indigo-0";
      break;
    case "blue":
      focusClasses = "focus:ring-blue-200";
      break;
    default:
      focusClasses = "focus:ring-gray-200";
  }
  // Combinar todas las clases
  const allClasses = `${baseClasses} ${
    hasRing ? focusClasses : "focus:ring-indigo-0"
  } ${variantClasses} ${hoverVariantClasses}  ${className}`;

  return (
    <button className={allClasses + " " + "focus:ring-0"} {...props}>
      {children}
    </button>
  );
};
