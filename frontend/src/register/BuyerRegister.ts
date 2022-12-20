import { PersonRegisterInterface } from "./interfaces";
import validator from "validator";
import axios from "axios";
import Cpf from "cpf-manager";
import { ValidableInput } from "../ValidableInput";
import { cpfMask } from "../masks/masks";

export class BuyerRegister implements PersonRegisterInterface {
  private readonly nameInput = new ValidableInput("register-name", "register-name-message");
  private readonly emailInput = new ValidableInput("register-email", "register-email-message");
  private readonly cpfInput = new ValidableInput("register-cpf", "register-cpf-message", cpfMask);
  private readonly passwordInput = new ValidableInput("register-password", "register-password-message");
  private readonly confirmInput = new ValidableInput("register-confirm-password", "register-confirm-passowrd-message");

  constructor() {
    this.nameInput.input.addEventListener("blur", () => this.validateName());
    this.emailInput.input.addEventListener("blur", () => this.validateEmail());
    this.cpfInput.input.addEventListener("blur", () => this.validateCpf());
  }

  public async validate(): Promise<boolean> {
    return false;
  }

  public validateName(): boolean {
    const name = this.nameInput.value;
    if (name && !name.match(/^[A-z À-ú]+$/i)) {
      this.nameInput.invalidate("Nome não pode conter caractéres inválidos e números");
      return false;
    }

    this.nameInput.validate();
    return true;
  }

  public async validateEmail(): Promise<boolean> {
    const email = this.emailInput.value;
    if (email && !validator.isEmail(email)) {
      this.emailInput.invalidate("E-mail inválido");
      return false;
    }

    if (await this.emailExists(email)) {
      this.emailInput.invalidate("Email já existente");
      return false;
    }

    this.emailInput.validate();
    return true;
  }

  public async validateCpf(): Promise<boolean> {
    const cpf = this.cpfInput.value;
    if (cpf && !Cpf.validate(cpf)) {
      this.cpfInput.invalidate("CPF inválido");
      return false;
    }

    this.cpfInput.validate();
    return true;
  }

  validatePassword(): boolean {
    throw new Error("Method not implemented.");
  }

  private async emailExists(email: string): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-email",
        data: { email },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }
}
