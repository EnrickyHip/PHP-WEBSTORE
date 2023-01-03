import { ValidationInterface } from "../interfaces/Registerinterfaces";
import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";
import { EmailValidator } from "./EmailValidation";

export class EmailInputValidation implements ValidationInterface {
  constructor(private email: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.email.isEmpty()) {
      this.email.invalidate("digite seu E-mail");
    }

    const email = this.email.value;

    if (!EmailValidator.isEmail(email)) {
      this.email.invalidate("E-mail inválido");
      return false;
    }

    if (await this.emailExists()) {
      this.email.invalidate("E-mail já existente");
      return false;
    }

    this.email.validate();
    return true;
  }

  public async emailExists() {
    return await EmailValidator.emailExists(this.email.value);
  }
}
