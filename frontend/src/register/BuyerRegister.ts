import { BuyerRegisterInterface } from "./interfaces";
import validator from "validator";

export class BuyerRegister implements BuyerRegisterInterface {
  private readonly nameInput = document.getElementById("register-name") as HTMLInputElement;
  private readonly emailInput = document.getElementById("register-email") as HTMLInputElement;
  private readonly cpfInput = document.getElementById("register-cpf") as HTMLInputElement;
  private readonly passwordInput = document.getElementById("register-password") as HTMLInputElement;
  private readonly confirmInput = document.getElementById("register-confirm-password") as HTMLInputElement;

  private readonly nameMessage = document.getElementById("register-name-message") as HTMLSpanElement;
  private readonly emailMessage = document.getElementById("register-email-message") as HTMLSpanElement;
  private readonly cpfMessage = document.getElementById("register-cpf-message") as HTMLSpanElement;
  private readonly passwordMessage = document.getElementById("register-password-message") as HTMLSpanElement;
  private readonly confirmMessage = document.getElementById("register-confirm-passowrd-message") as HTMLInputElement;

  constructor() {
    this.nameInput.addEventListener("blur", () => {
      if (this.validateName()) {
        this.nameMessage.style.visibility = "hidden";
      } else {
        this.nameMessage.style.visibility = "visible";
      }
    });

    this.emailInput.addEventListener("blur", () => {
      if (this.validateName()) {
        this.emailMessage.style.visibility = "hidden";
      } else {
        this.emailMessage.style.visibility = "visible";
      }
    });
  }

  public validate(): boolean {
    return false;
  }

  validateEmail(): boolean {
    const { value } = this.emailInput;
    if (!validator.isEmail(value)) {
      return false;
    }

    return true;
  }
  validateCpf(): boolean {
    throw new Error("Method not implemented.");
  }
  validatePassword(): boolean {
    throw new Error("Method not implemented.");
  }

  public validateName(): boolean {
    if (!this.nameInput.value.match(/^[a-zA-Z À-ú]+$/i)) {
      this.nameMessage.innerHTML = "Nome não pode conter caractéres inválidos e números";
      return false;
    }

    return true;
  }
}
