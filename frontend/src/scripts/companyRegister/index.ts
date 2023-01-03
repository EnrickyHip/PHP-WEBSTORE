import { CompanyRegister } from "./CompanyRegister";

const button = document.getElementById("register-button") as HTMLButtonElement;
const register = new CompanyRegister();

button.addEventListener("click", async () => {
  console.log(await register.validate());
});
