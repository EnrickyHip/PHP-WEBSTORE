import { InputInterface } from "./InputInterface";

export interface ValidableInputInterface extends InputInterface {
  validate(): void;
  invalidate(message: string): void;
}
