import { ValidationInterface } from "../../interfaces/Registerinterfaces";
import { ValidableInputInterface } from "../../interfaces/ValidableInputInterface";

export class PasswordInputValidation implements ValidationInterface {
  constructor(private password: ValidableInputInterface, private confirm: ValidableInputInterface) {}

  public validate(): boolean {
    const validation = this.validatePassword();
    if (!validation.valid) {
      this.password.invalidate(validation.errors[0]);
      return false;
    }

    this.password.validate();

    if (!this.compare()) {
      this.confirm.invalidate("senhas não coincidem");
      return false;
    }

    this.confirm.validate();

    return true;
  }

  public validatePassword(): { valid: boolean; errors: string[] } {
    const { value } = this.password;
    const errors: string[] = [];

    if (this.password.isEmpty()) {
      errors.push("digite sua senha");
    }

    if (value.length < 8) {
      errors.push("senha deve conter mais de 8 caracteres");
    }

    if (!value.match(/[a-z]/g)) {
      errors.push("senha deve conter letras minúsculas");
    }

    if (!value.match(/[A-Z]/g)) {
      errors.push("senha deve conter letras maiúsculas");
    }

    if (!value.match(/\d/g)) {
      errors.push("senha deve conter números");
    }

    return { valid: errors.length === 0, errors };
  }

  public compare(): boolean {
    return this.confirm.value === this.password.value;
  }
}
