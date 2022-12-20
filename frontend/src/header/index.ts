import "./style.css";
import Dropdown from "../classes/Dropdown";

const accountIcon = document.getElementById("account-icon") as HTMLSpanElement;
const dropdown = document.getElementById("login-dropdown") as HTMLDivElement;

new Dropdown(dropdown, accountIcon);
