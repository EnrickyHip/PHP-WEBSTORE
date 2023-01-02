export interface ValidableInterface {
  validate(): void;
  invalidate(message: string): void;
}
