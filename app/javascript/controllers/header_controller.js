import { Controller } from "@hotwired/stimulus"

// this controller handles menu open/close AND clicking outside to close
export default class extends Controller {
  static targets = ["menu", "toggler", "openIcon", "closeIcon"]

  connect() {
    this.outsideClick = this.outsideClick.bind(this)
  }

  toggleMenu() {
    const isOpen = this.menuTarget.classList.contains("show")

    if (isOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }
    onScroll() {
    if (window.innerWidth >= 768) {
      if (window.scrollY > 50) {
        this.element.classList.add("header-light")
      } else {
        this.element.classList.remove("header-light")
      }
    }
  }

  openMenu() {
    this.menuTarget.classList.add("show")
    this.openIconTarget.classList.add("d-none")
    this.closeIconTarget.classList.remove("d-none")

    document.addEventListener("click", this.outsideClick)
  }

  closeMenu() {
    this.menuTarget.classList.remove("show")
    this.openIconTarget.classList.remove("d-none")
    this.closeIconTarget.classList.add("d-none")

    document.removeEventListener("click", this.outsideClick)
  }

  outsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.closeMenu()
    }
  }
}
