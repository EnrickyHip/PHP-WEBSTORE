import { Input } from "../classes/Input";
import { ValidableInput } from "../classes/ValidableInput";
import { Mask } from "../masks/Mask";

export class InputFactory {
  public makeInput(inputId: string, mask?: Mask): Input {
    const input = document.getElementById(inputId);

    if (input === null || !(input instanceof HTMLInputElement)) {
      throw new Error(`Input of id "${inputId}" does not exists!`);
    }

    return new Input(input, mask);
  }

  public makeValidableInput(inputId: string, messageSpanId: string, mask?: Mask): ValidableInput {
    const input = document.getElementById(inputId);
    if (input === null || !(input instanceof HTMLInputElement)) {
      throw new Error(`Input of id "${inputId}" does not exists!`);
    }

    const messageSpan = document.getElementById(messageSpanId) as HTMLSpanElement;
    if (messageSpan === null || !(messageSpan instanceof HTMLSpanElement)) {
      throw new Error(`Span of id "${messageSpanId}" does not exists!`);
    }

    return new ValidableInput(input, messageSpan, mask);
  }
}
