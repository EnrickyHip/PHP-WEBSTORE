export default class Dropdown {
  private open = false;

  constructor(private readonly dropdown: HTMLDivElement, private readonly button: HTMLElement) {
    this.button.addEventListener("click", () => {
      this.toggleDropdown();
    });
  }

  private toggleDropdown(): void {
    if (this.open) {
      this.dropdown.style.display = "none";
      this.open = false;
    } else {
      this.dropdown.style.display = "block";
      this.open = true;
    }
  }
}
