import { InputFactory } from "../../factories/InputFactory";
import { CompanyRegisterInterface } from "../../interfaces/Registerinterfaces";
import { EmailInputValidation } from "../../classes/InputValidations/EmailInputValidation";
import { PasswordInputValidation } from "../../classes/PasswordInputValidation";
import { CnpjInputValidation } from "../../classes/CnpjInputValidation";
import { cnpjMask } from "../../masks/masks";
import { WebsiteInputValidation } from "../../classes/WebsiteInputValidation";

export class CompanyRegister implements CompanyRegisterInterface {
  private readonly inputFactory = new InputFactory();
  private readonly nameInput = this.inputFactory.makeValidableInput("register-name", "register-name-message");
  private readonly emailInput = this.inputFactory.makeValidableInput("register-email", "register-email-message");
  private readonly cnpjInput = this.inputFactory.makeValidableInput("register-cnpj", "register-cnpj-message", cnpjMask);
  private readonly websiteInput = this.inputFactory.makeValidableInput("register-website", "register-website-message");
  private readonly dateInput = this.inputFactory.makeValidableInput(
    "register-foundation-date",
    "register-foundation-date-message",
  );
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
    this.cnpjInput.this.addEventListener("input", () => this.validateCnpj());
    this.passwordInput.this.addEventListener("input", () => this.validatePassword());
    this.websiteInput.this.addEventListener("input", () => this.validateWebsite());
    this.confirmInput.this.addEventListener("input", () => this.validatePassword());
    this.dateInput.this.addEventListener("input", () => this.validateDate());
  }

  public async validate(): Promise<boolean> {
    let isValid = true;
    !this.validateName() && (isValid = false);
    !(await this.validateEmail()) && (isValid = false);
    !this.validateCnpj() && (isValid = false);
    !this.validateWebsite() && (isValid = false);
    !this.validatePassword() && (isValid = false);
    !this.validateDate() && (isValid = false);
    return isValid;
  }

  public validateName(): boolean {
    if (this.nameInput.isEmpty()) {
      this.nameInput.invalidate("Digite o nome de sua empresa");
      return false;
    }

    this.nameInput.validate();
    return true;
  }

  public validateDate(): boolean {
    if (this.dateInput.isEmpty()) {
      this.dateInput.invalidate("Selecione uma data");
      return false;
    }

    this.dateInput.validate();
    return true;
  }

  public validateCnpj(): Promise<boolean> {
    const cnpjValidation = new CnpjInputValidation(this.cnpjInput);
    return cnpjValidation.validate();
  }

  public validateWebsite(): boolean {
    const websiteValidation = new WebsiteInputValidation(this.websiteInput);
    return websiteValidation.validate();
  }

  public async validateEmail(): Promise<boolean> {
    const emailValidation = new EmailInputValidation(this.emailInput);
    return emailValidation.validate();
  }

  public validatePassword(): boolean {
    const passwordValidation = new PasswordInputValidation(this.passwordInput, this.confirmInput);
    return passwordValidation.validate();
  }
}
