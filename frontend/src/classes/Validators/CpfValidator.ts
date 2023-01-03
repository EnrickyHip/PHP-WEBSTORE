import axios from "axios";
import Cpf from "cpf-manager";

export class CpfValidator {
  public static async cpfExists(cpf: string): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-cpf",
        data: { cpf },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }

  public static cleanUp(cpf: string): string {
    return Cpf.cleanUp(cpf);
  }

  public static validate(cpf: string): boolean {
    return Cpf.validate(cpf);
  }
}
