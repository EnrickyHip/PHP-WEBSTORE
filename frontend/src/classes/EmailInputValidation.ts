import axios from "axios";
import validator from "validator";
import { ValidationInterface } from "../interfaces/Registerinterfaces";
import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";

export class EmailInputValidation implements ValidationInterface {
  constructor(private email: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.email.isEmpty()) {
      this.email.invalidate("digite seu E-mail");
    }

    const email = this.email.value;

    if (!validator.isEmail(email)) {
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

  public async emailExists(): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-email",
        data: { email: this.email.value },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }
}
