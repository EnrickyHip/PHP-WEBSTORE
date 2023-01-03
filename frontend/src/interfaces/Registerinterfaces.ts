interface RegisterInterface {
  validate(): Promise<boolean> | boolean;
}

interface UserRegisterInterface extends RegisterInterface {
  validateName(): boolean;
  validateEmail(): Promise<boolean>;
  validatePassword(): boolean;
}

export interface PersonRegisterInterface extends UserRegisterInterface {
  validateCpf(): Promise<boolean>;
}

export interface SellerRegisterInterface extends UserRegisterInterface {
  validateWebsite(): boolean;
  validateDate(): boolean;
}

export interface CompanyRegisterInterface extends SellerRegisterInterface {
  validateCnpj(): Promise<boolean>;
}
