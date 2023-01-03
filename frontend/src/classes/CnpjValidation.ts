import axios from "axios";
import Cnpj from "cnpj-manager";
import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";

export class CnpjValidation {
  constructor(private cnpj: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.cnpj.isEmpty()) {
      this.cnpj.invalidate("digite o CNPJ de sua empresa");
      return false;
    }

    if (!Cnpj.validate(this.cnpj.value)) {
      this.cnpj.invalidate("CNPJ inválido");
      return false;
    }

    if (await this.cnpjExists()) {
      this.cnpj.invalidate("CNPJ já cadastrado");
      return false;
    }

    this.cnpj.validate();
    return true;
  }

  public async cnpjExists(): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-cnpj",
        data: { cnpj: Cnpj.cleanUp(this.cnpj.value) },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }
}
