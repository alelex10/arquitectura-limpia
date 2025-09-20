import React from "react";
import { LoadingSpinner } from "../loading/LoadingSpinner";

type ButtonVariant = "indigo" | "blue" | "desabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  hasRing?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "blue",
  className = "",
  hasRing = false,
  isLoading = false,
  ...props
}: ButtonProps) => {
  // Clases base comunes a todos los botones
  const baseClasses =
    "px-6 py-3 rounded font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center";

  // Clases específicas según la variante
  let variantClasses = "";
  let hoverVariantClasses = "";

  let loadingComponent = null;
  if (isLoading) {
    if (variant === "indigo" || variant === "blue") {
      loadingComponent = (
        <LoadingSpinner className="mr-2" background="dark" />
      );
    } else {
      loadingComponent = (
        <LoadingSpinner className="mr-2" background="light" />
      );
    }
  }

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
      variantClasses = "bg-white text-blue-600";
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
    <button
      className={allClasses + (isLoading ? " cursor-wait" : "")}
      {...props}
    >
      {loadingComponent} 
      {children}
    </button>
  );
};
