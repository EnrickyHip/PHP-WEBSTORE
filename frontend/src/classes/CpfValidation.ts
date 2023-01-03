import axios from "axios";
import Cpf from "cpf-manager";
import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";

export class CpfValidation {
  constructor(private cpf: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.cpf.isEmpty()) {
      this.cpf.invalidate("digite seu CPF");
      return false;
    }

    if (!Cpf.validate(this.cpf.value)) {
      this.cpf.invalidate("CPF inválido");
      return false;
    }

    if (await this.cpfExists()) {
      this.cpf.invalidate("CPF já cadastrado");
      return false;
    }

    this.cpf.validate();
    return true;
  }

  public async cpfExists(): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-cpf",
        data: { cpf: Cpf.cleanUp(this.cpf.value) },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }
}
