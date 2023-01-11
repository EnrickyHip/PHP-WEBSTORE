import { PersonSellerRegister } from "./PersonSellerRegister";

const button = document.getElementById("register-button") as HTMLButtonElement;
const register = new PersonSellerRegister();

button.addEventListener("click", async () => {
  console.log(await register.validate());
});
