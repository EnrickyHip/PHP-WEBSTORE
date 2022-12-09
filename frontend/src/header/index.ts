import "./style.css";
import Dropdown from "../Dropdown";

const accountIcon = document.getElementById("account-icon") as HTMLSpanElement;
const loginDropdownDiv = document.getElementById("login-dropdown") as HTMLDivElement;

new Dropdown(loginDropdownDiv, accountIcon);
