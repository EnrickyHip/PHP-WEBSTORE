import { PersonRegisterInterface } from "./interfaces";
import validator from "validator";
import axios from "axios";

export class BuyerRegister implements PersonRegisterInterface {
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

    this.emailInput.addEventListener("blur", async () => {
      if (await this.validateEmail()) {
        this.emailMessage.style.visibility = "hidden";
      } else {
        this.emailMessage.style.visibility = "visible";
      }
    });
  }

  public async validate(): Promise<boolean> {
    return false;
  }

  public async validateEmail(): Promise<boolean> {
    const { value } = this.emailInput;
    if (value && !validator.isEmail(value)) {
      this.emailMessage.innerHTML = "Email inválido";
      return false;
    }

    if (await this.emailExists(value)) {
      this.emailMessage.innerHTML = "Email já existente";
      return false;
    }

    return true;
  }

  public async validateCpf(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  validatePassword(): boolean {
    throw new Error("Method not implemented.");
  }

  public validateName(): boolean {
    const { value } = this.nameInput;
    if (value && !value.match(/^[A-z À-ú]+$/i)) {
      this.nameMessage.innerHTML = "Nome não pode conter caractéres inválidos e números";
      return false;
    }

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
}
