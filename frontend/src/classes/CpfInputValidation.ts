import { ValidationInterface } from "../interfaces/Registerinterfaces";
import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";
import { CpfValidator } from "./CpfValidator";

export class CpfInputValidation implements ValidationInterface {
  constructor(private cpf: ValidableInputInterface) {}

  public async validate(): Promise<boolean> {
    if (this.cpf.isEmpty()) {
      this.cpf.invalidate("digite seu CPF");
      return false;
    }

    if (!CpfValidator.validate(this.cpf.value)) {
      this.cpf.invalidate("CPF inválido");
      return false;
    }

    if (await CpfValidator.cpfExists(this.cpf.value)) {
      this.cpf.invalidate("CPF já cadastrado");
      return false;
    }

    this.cpf.validate();
    return true;
  }
}
