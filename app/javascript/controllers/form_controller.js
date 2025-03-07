// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "message", "submit"]

  connect() {
    this.validateForm()
  }

  validateForm() {
    const isNameValid = this.nameTarget.value.trim().length >= 2
    const isMessageValid = this.messageTarget.value.trim().length >= 10

    this.nameTarget.classList.toggle("is-invalid", !isNameValid)
    this.messageTarget.classList.toggle("is-invalid", !isMessageValid)

    this.submitTarget.disabled = !(isNameValid && isMessageValid)
  }

  clearForm() {
    this.element.reset()
    this.validateForm()
  }
}
