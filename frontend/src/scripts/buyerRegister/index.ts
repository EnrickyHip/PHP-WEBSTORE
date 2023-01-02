import { BuyerRegister } from "./BuyerRegister";

const button = document.getElementById("register-button") as HTMLButtonElement;
const register = new BuyerRegister();

button.addEventListener("click", async () => {
  console.log(await register.validate());
});
