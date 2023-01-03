import validator from "validator";

export class WebsiteValidator {
  public static isUrl(url: string): boolean {
    return validator.isURL(url);
  }
}
