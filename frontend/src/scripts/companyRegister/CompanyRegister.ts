import { InputFactory } from "../../factories/InputFactory";
import { CompanyRegisterInterface } from "../../interfaces/Registerinterfaces";
import { EmailValidation } from "../../classes/EmailValidation";
import { PasswordValidation } from "../../classes/PasswordValidation";
import { CnpjValidation } from "../../classes/CnpjValidation";
import { cnpjMask } from "../../masks/masks";

export class CompanyRegister implements CompanyRegisterInterface {
  private readonly inputFactory = new InputFactory();
  private readonly nameInput = this.inputFactory.makeValidableInput("register-name", "register-name-message");
  private readonly emailInput = this.inputFactory.makeValidableInput("register-email", "register-email-message");
  private readonly cnpjInput = this.inputFactory.makeValidableInput("register-cnpj", "register-cnpj-message", cnpjMask);
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
    this.cnpjInput.this.addEventListener("blur", () => this.validateCnpj());
    this.passwordInput.this.addEventListener("blur", () => this.validatePassword());
    this.confirmInput.this.addEventListener("blur", () => this.validatePassword());
  }

  validateCnpj(): Promise<boolean> {
    const cnpjValidation = new CnpjValidation(this.cnpjInput);
    return cnpjValidation.validate();
  }

  validateWebsite(): boolean {
    throw new Error("Method not implemented.");
  }

  public async validate(): Promise<boolean> {
    let isValid = true;
    !this.validateName() && (isValid = false);
    !(await this.validateEmail()) && (isValid = false);
    !this.validateCnpj() && (isValid = false);
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
    const emailValidation = new EmailValidation(this.emailInput);
    return emailValidation.validate();
  }

  public validatePassword(): boolean {
    const passwordValidation = new PasswordValidation(this.passwordInput, this.confirmInput);
    return passwordValidation.validate();
  }
}
