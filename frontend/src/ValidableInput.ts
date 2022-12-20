import { Input } from "./Input";
import { Mask } from "./masks/Mask";

export class ValidableInput extends Input {
  private readonly messageSpan: HTMLSpanElement;

  constructor(inputId: string, messageSpanId: string, mask?: Mask) {
    super(inputId, mask);
    const messageSpan = document.getElementById(messageSpanId) as HTMLSpanElement;

    if (messageSpan === null || !(messageSpan instanceof HTMLSpanElement)) {
      throw new Error(`Span of id "${messageSpanId}" does not exists!`);
    }

    this.messageSpan = messageSpan;
  }

  public invalidate(message: string): void {
    this.messageSpan.innerHTML = message;
    this.messageSpan.style.visibility = "visible";
  }

  public validate(): void {
    this.messageSpan.style.visibility = "hidden";
    this.messageSpan.innerHTML = "";
  }
}
