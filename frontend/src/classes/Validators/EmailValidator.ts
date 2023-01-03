import axios from "axios";
import validator from "validator";

export class EmailValidator {
  public static isEmail(email: string): boolean {
    return validator.isEmail(email);
  }

  public static async emailExists(email: string): Promise<boolean> {
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
