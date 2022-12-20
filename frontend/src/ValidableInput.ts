import { Input } from "./Input";
import { Mask } from "./masks/Mask";

export class ValidableInput extends Input {
  private messageElement: HTMLSpanElement;

  constructor(inputId: string, messageElementId: string, mask?: Mask) {
    super(inputId, mask);
    this.messageElement = document.getElementById(messageElementId) as HTMLSpanElement;
  }

  public invalidate(message: string) {
    this.messageElement.innerHTML = message;
    this.messageElement.style.visibility = "visible";
  }

  public validate() {
    this.messageElement.style.visibility = "hidden";
    this.messageElement.innerHTML = "";
  }
}
