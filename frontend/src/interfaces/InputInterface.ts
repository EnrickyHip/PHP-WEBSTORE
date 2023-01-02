export interface InputInterface {
  value: string;
  this: HTMLInputElement;
  isEmpty(): boolean;
}
