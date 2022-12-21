import { PersonRegisterInterface } from "./interfaces";
import validator from "validator";
import axios from "axios";
import Cpf from "cpf-manager";
import { cpfMask } from "../masks/masks";
import { InputFactory } from "../factories/InputFactory";

export class BuyerRegister implements PersonRegisterInterface {
  private readonly inputFactory = new InputFactory();
  private readonly nameInput = this.inputFactory.makeValidableInput("register-name", "register-name-message");
  private readonly emailInput = this.inputFactory.makeValidableInput("register-email", "register-email-message");
  private readonly cpfInput = this.inputFactory.makeValidableInput("register-cpf", "register-cpf-message", cpfMask);
  private readonly passwordInput = this.inputFactory.makeValidableInput(
    "register-password",
    "register-password-message",
  );
  private readonly confirmInput = this.inputFactory.makeValidableInput(
    "register-confirm-password",
    "register-confirm-password-message",
  );

  constructor() {
    this.nameInput.this.addEventListener("input", () => this.validateName());
    this.emailInput.this.addEventListener("input", () => this.validateEmail());
    this.cpfInput.this.addEventListener("input", () => this.validateCpf());
    this.passwordInput.this.addEventListener("input", () => this.validatePassword());
    this.confirmInput.this.addEventListener("input", () => this.validatePassword());
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

    if (await this.cpfExists(Cpf.cleanUp(cpf))) {
      this.cpfInput.invalidate("CPF já cadastrado");
      return false;
    }

    this.cpfInput.validate();
    return true;
  }

  public validatePassword(): boolean {
    const { value } = this.passwordInput;
    const { value: confirmValue } = this.confirmInput;

    if (value && !value.match(/[a-z]/g)) {
      this.passwordInput.invalidate("senha deve conter letras minúsculas");
      return false;
    }

    if (value && !value.match(/[A-Z]/g)) {
      this.passwordInput.invalidate("senha deve conter letras maiúsculas");
      return false;
    }

    if (value && !value.match(/\d/g)) {
      this.passwordInput.invalidate("senha deve conter números");
      return false;
    }

    this.passwordInput.validate();

    if (value && confirmValue && confirmValue !== value) {
      this.confirmInput.invalidate("senhas não coincidem");
      return false;
    }

    this.confirmInput.validate();
    return true;
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

  private async cpfExists(cpf: string): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-cpf",
        data: { cpf },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }
}
