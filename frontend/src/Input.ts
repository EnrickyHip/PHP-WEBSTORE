import { Mask } from "./masks/Mask";

export class Input {
  protected readonly _input: HTMLInputElement;

  constructor(inputId: string, mask?: Mask) {
    const input = document.getElementById(inputId);

    if (input === null || !(input instanceof HTMLInputElement)) {
      throw new Error(`Input of id "${inputId}" does not exists!`);
    }

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

  public get input(): HTMLInputElement {
    return this._input;
  }
}
