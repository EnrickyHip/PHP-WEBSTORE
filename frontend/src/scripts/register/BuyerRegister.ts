import { PersonRegisterInterface } from "./interfaces";
import validator from "validator";
import axios from "axios";
import Cpf from "cpf-manager";
import { cpfMask } from "../../masks/masks";
import { InputFactory } from "../../factories/InputFactory";

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
    this.nameInput.this.addEventListener("blur", () => this.validateName());
    this.emailInput.this.addEventListener("blur", () => this.validateEmail());
    this.cpfInput.this.addEventListener("blur", () => this.validateCpf());
    this.passwordInput.this.addEventListener("blur", () => this.validatePassword());
    this.confirmInput.this.addEventListener("blur", () => this.validatePassword());
  }

  public async validate(): Promise<boolean> {
    let isValid = true;
    !this.validateName() && (isValid = false);
    !(await this.validateCpf()) && (isValid = false);
    !(await this.validateEmail()) && (isValid = false);
    !this.validatePassword() && (isValid = false);
    return isValid;
  }

  public validateName(): boolean {
    if (this.nameInput.isEmpty()) {
      this.nameInput.invalidate("Nome não pode estar vazio!");
      return false;
    }

    const name = this.nameInput.value;

    if (!name.match(/^[A-z À-ú]+$/i)) {
      this.nameInput.invalidate("Nome não pode conter caractéres inválidos e números");
      return false;
    }

    this.nameInput.validate();
    return true;
  }

  public async validateEmail(): Promise<boolean> {
    if (this.emailInput.isEmpty()) {
      this.emailInput.invalidate("Email não pode estar vazio!");
    }

    const email = this.emailInput.value;

    if (!validator.isEmail(email)) {
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
    if (this.cpfInput.isEmpty()) {
      this.cpfInput.invalidate("CPF não pode estar vazio!");
      return false;
    }

    const cpf = this.cpfInput.value;

    if (!Cpf.validate(cpf)) {
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

    if (this.passwordInput.isEmpty()) {
      this.passwordInput.invalidate("senha não ser vazia!");
      return false;
    }

    if (!value.match(/[a-z]/g)) {
      this.passwordInput.invalidate("senha deve conter letras minúsculas");
      return false;
    }

    if (!value.match(/[A-Z]/g)) {
      this.passwordInput.invalidate("senha deve conter letras maiúsculas");
      return false;
    }

    if (!value.match(/\d/g)) {
      this.passwordInput.invalidate("senha deve conter números");
      return false;
    }

    this.passwordInput.validate();

    if (confirmValue !== value) {
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
