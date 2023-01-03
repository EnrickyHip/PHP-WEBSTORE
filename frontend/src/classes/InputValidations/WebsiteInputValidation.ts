import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";
import { ValidationInterface } from "../interfaces/Registerinterfaces";
import { WebsiteValidator } from "./WebsiteValidator";

export class WebsiteInputValidation implements ValidationInterface {
  constructor(private website: ValidableInputInterface) {}

  public validate(): boolean {
    const { value } = this.website;

    if (value.trim() && !WebsiteValidator.isUrl(value)) {
      this.website.invalidate("Url inválida");
      return false;
    }

    this.website.validate();
    return true;
  }
}
