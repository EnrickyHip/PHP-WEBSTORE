export default class Dropdown {
  private open = false;

  constructor(private readonly dropdown: HTMLDivElement, private readonly button: HTMLElement) {
    document.addEventListener("click", (event: Event) => {
      this.toggle(event.target as EventTarget);
    });
  }

  private toggle(target: EventTarget): void {
    if (this.open) {
      this.dropdown.style.display = "none";
      this.open = false;
    } else if (target === this.button) {
      this.dropdown.style.display = "block";
      this.open = true;
    }
  }
}
