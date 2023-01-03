import { Mask } from "./Mask";

export const cpfMask: Mask = (value: string): string => {
  value = value.replace(/\D/g, ""); //Remove tudo o que não é dígito
  value = value.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  value = value.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  return value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
};

export const cnpjMask: Mask = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1/$2");
  return value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};
