import { cpfMask } from "../../masks/masks";
import { InputFactory } from "../../factories/InputFactory";
import { PersonRegisterInterface } from "../../interfaces/Registerinterfaces";
import { EmailInputValidation } from "../../classes/InputValidations/EmailInputValidation";
import { CpfInputValidation } from "../../classes/InputValidations/CpfInputValidation";
import { PasswordInputValidation } from "../../classes/InputValidations/PasswordInputValidation";

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
    let isValid = true;
    !this.validateName() && (isValid = false);
    !(await this.validateCpf()) && (isValid = false);
    !(await this.validateEmail()) && (isValid = false);
    !this.validatePassword() && (isValid = false);
    return isValid;
  }

  public validateName(): boolean {
    if (this.nameInput.isEmpty()) {
      this.nameInput.invalidate("Digite seu nome");
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
    const emailValidation = new EmailInputValidation(this.emailInput);
    return emailValidation.validate();
  }

  public async validateCpf(): Promise<boolean> {
    const cpfValidation = new CpfInputValidation(this.cpfInput);
    return await cpfValidation.validate();
  }

  public validatePassword(): boolean {
    const passwordValidation = new PasswordInputValidation(this.passwordInput, this.confirmInput);
    return passwordValidation.validate();
  }
}
