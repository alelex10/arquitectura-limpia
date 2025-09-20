import React, { useState } from "react";
import {
  MessageErrorFrom,
  type MessageErrorFromProps,
} from "./MessageErrorFrom";
import type { CompareInputsProps } from "./FormCustom";

interface MyInputSpecificProps {
  children?: React.ReactNode;
  validationInput?: (value: string) => string;
  compared?: {
    id: string;
    setCompareInputs: React.Dispatch<
      React.SetStateAction<CompareInputsProps[] | undefined>
    >;
  };
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    MyInputSpecificProps {}

export const Input = (props: InputProps) => {
  const [messageError, setMessageError] = useState("");
  const { compared, children, validationInput, ...inputAttributes } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const target = event.target;
    setMessageError(validationInput ? validationInput(value) : "");

    if (compared) {
      compared.setCompareInputs((prevInputs) => {
        if (prevInputs) {
          return prevInputs.map((input) => {
            if (input.id === compared.id) {
              if (input.target.value !== value) {
                setMessageError(
                  `Los campos de ${target.name} y ${input.target.name} no coinciden`
                );
              }
            }
            return input;
          });
        }
        return [{ id: compared.id, target }];
      });
    }
    // inputAttributes.onChange?.(event);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child; // Devuelve strings, números, null, etc. tal cual
      }
      if (child.type === MessageErrorFrom) {
        // ... (lógica de clonación)
        return messageError
          ? React.cloneElement(
              child as React.ReactElement<MessageErrorFromProps>,
              {
                key: child.key || `error-message-${index}`,
                children: <>{messageError}</>,
              }
            )
          : null;
      }
      return React.cloneElement(child, { key: child.key });
    });
  };
  return (
    <div>
      {inputAttributes.name && (
        <label htmlFor={inputAttributes.id}>{inputAttributes.name}</label>
      )}

      <input
        {...inputAttributes} // Propaga todas las props que no son 'color'
        className={` ${inputAttributes.className || ""}`.trim()} // Aplica el color y cualquier otro className
		// onChange={handleOnChange}
      />
      {renderChildren()}
    </div>
  );
};
