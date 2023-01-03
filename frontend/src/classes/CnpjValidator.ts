import axios from "axios";
import Cnpj from "cnpj-manager";

export class CnpjValidator {
  public static async cnpjExists(cnpj: string): Promise<boolean> {
    try {
      const response = await axios<boolean>({
        method: "post",
        url: "/user/exists-cnpj",
        data: { cnpj },
      });

      return response.data;
    } catch (error) {
      console.log("Ocorreu um erro inesperado.");
      return false;
    }
  }

  public static cleanUp(cnpj: string): string {
    return Cnpj.cleanUp(cnpj);
  }

  public static validate(cnpj: string): boolean {
    return Cnpj.validate(cnpj);
  }
}
