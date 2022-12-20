import { InputInterface } from "../interfaces/InputInterface";
import { Mask } from "../masks/Mask";

export class Input implements InputInterface {
  protected readonly _input: HTMLInputElement;

  constructor(input: HTMLInputElement, mask?: Mask) {
    this._input = input;

    if (mask) {
      this._input.addEventListener("input", () => {
        this._input.value = mask(this._input.value);
      });
    }
  }

  public get value(): string {
    return this._input.value;
  }

  public get this(): HTMLInputElement {
    return this._input;
  }
}
