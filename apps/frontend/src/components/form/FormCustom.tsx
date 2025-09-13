import { Input } from "./Input";
import { MessageErrorFrom } from "./MessageErrorFrom";
import { validationNameForm } from "./InputValidationCases";
import styles from "./FormStyle.module.css";

export const FormCustom = () => {
	return (
		<form className={styles.formContainer}>
			<h2 className={styles.formTitle}>Formulario de Registro</h2>
			<div className={styles.formGroup}>
				<Input className={styles.formGroup} type="text" id="name" name="name" validationInput={validationNameForm}>
					<MessageErrorFrom>El nombre es requerido</MessageErrorFrom>
				</Input>
			</div>
		</form>
	);
};


