import { ValidableInputInterface } from "../interfaces/ValidableInputInterface";
import validator from "validator";

export class WebsiteValidation {
  constructor(private website: ValidableInputInterface) {}

  public validate(): boolean {
    const { value } = this.website;

    if (value.trim() && !validator.isURL(value)) {
      this.website.invalidate("Url inválida");
      return false;
    }

    this.website.validate();
    return true;
  }
}
