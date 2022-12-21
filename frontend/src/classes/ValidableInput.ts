import { Mask } from "../masks/Mask";
import { Input } from "./Input";

export class ValidableInput extends Input {
  private readonly messageSpan: HTMLSpanElement;

  constructor(input: HTMLInputElement, messageSpan: HTMLSpanElement, mask?: Mask) {
    super(input, mask);
    this.messageSpan = messageSpan;
    this.messageSpan.innerHTML = "message";
  }

  public invalidate(message: string): void {
    this.messageSpan.innerHTML = message;
    this.messageSpan.style.visibility = "visible";
  }

  public validate(): void {
    this.messageSpan.style.visibility = "hidden";
  }
}
