import { InputFactory } from "../../factories/InputFactory";
import { EmailInputValidation } from "../../classes/InputValidations/EmailInputValidation";
import { cpfMask } from "../../masks/masks";
import { WebsiteInputValidation } from "../../classes/InputValidations/WebsiteInputValidation";
import { PasswordInputValidation } from "../../classes/InputValidations/PasswordInputValidation";
import { PersonRegisterInterface, SellerRegisterInterface } from "../../interfaces/Registerinterfaces";
import { CpfInputValidation } from "../../classes/InputValidations/CpfInputValidation";
import { calculateAge } from "../../utils/calculateAge";

export class PersonSellerRegister implements PersonRegisterInterface, SellerRegisterInterface {
  private readonly inputFactory = new InputFactory();
  private readonly nameInput = this.inputFactory.makeValidableInput("register-name", "register-name-message");
  private readonly emailInput = this.inputFactory.makeValidableInput("register-email", "register-email-message");
  private readonly cpfInput = this.inputFactory.makeValidableInput("register-cpf", "register-cpf-message", cpfMask);
  private readonly websiteInput = this.inputFactory.makeValidableInput("register-website", "register-website-message");
  private readonly dateInput = this.inputFactory.makeValidableInput(
    "register-birth-date",
    "register-birth-date-message",
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
    this.cpfInput.this.addEventListener("input", () => this.validateCpf());
    this.passwordInput.this.addEventListener("input", () => this.validatePassword());
    this.websiteInput.this.addEventListener("input", () => this.validateWebsite());
    this.confirmInput.this.addEventListener("input", () => this.validatePassword());
    this.dateInput.this.addEventListener("input", () => this.validateDate());
  }

  public async validate(): Promise<boolean> {
    let isValid = true;
    !this.validateName() && (isValid = false);
    !(await this.validateEmail()) && (isValid = false);
    !this.validateCpf() && (isValid = false);
    !this.validateWebsite() && (isValid = false);
    !this.validatePassword() && (isValid = false);
    !this.validateDate() && (isValid = false);
    return isValid;
  }

  public validateDate(): boolean {
    if (this.dateInput.isEmpty()) {
      this.dateInput.invalidate("Selecione uma data");
      return false;
    }

    const date = new Date(this.dateInput.value);
    if (calculateAge(date) < 18) {
      this.dateInput.invalidate("Você precisa ser maior de idade para vendar na Webstore!");
      return false;
    }

    this.dateInput.validate();
    return true;
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

  public async validateCpf(): Promise<boolean> {
    const cpfValidation = new CpfInputValidation(this.cpfInput);
    return await cpfValidation.validate();
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
