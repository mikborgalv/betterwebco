// app/javascript/controllers/header_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu"];

  toggleMenu() {
    this.menuTarget.classList.toggle("show");
  }

}
