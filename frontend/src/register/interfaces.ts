interface RegisterInterface {
  validate(): boolean;
}

interface UserRegisterInterface extends RegisterInterface {
  validateName(): boolean;
  validateEmail(): boolean;
  validatePassword(): boolean;
}

export interface BuyerRegisterInterface extends UserRegisterInterface {
  validateCpf(): boolean;
}

export interface SellerRegisterInterface extends UserRegisterInterface {
  validateWebsite(): boolean;
}

export interface CompanyRegisterInterface extends UserRegisterInterface, SellerRegisterInterface {
  validateCnpj(): boolean;
}
