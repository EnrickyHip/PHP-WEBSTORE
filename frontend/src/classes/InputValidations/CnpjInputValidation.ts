import { ValidationInterface } from "../../interfaces/Registerinterfaces";
import { ValidableInputInterface } from "../../interfaces/ValidableInputInterface";
import { CnpjValidator } from "../Validators/CnpjValidator";

export class CnpjInputValidation implements ValidationInterface {
  constructor(private cnpj: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.cnpj.isEmpty()) {
      this.cnpj.invalidate("digite o CNPJ de sua empresa");
      return false;
    }

    if (!CnpjValidator.validate(this.cnpj.value)) {
      this.cnpj.invalidate("CNPJ inválido");
      return false;
    }

    if (await CnpjValidator.cnpjExists(this.cnpj.value)) {
      this.cnpj.invalidate("CNPJ já cadastrado");
      return false;
    }

    this.cnpj.validate();
    return true;
  }
}
